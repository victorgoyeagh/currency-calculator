import { Subscription } from 'rxjs';
import { ExchangeRates, CurrencyFormPayload, RatesQueryType, BASE_CURRENCIES, Rates } from './../models/currency-converter.model';
import { CurrencyConverterService } from './../services/currency-converter.service';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-currency-converter',
    templateUrl: './currency-converter.component.html',
    styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
    public baseCurrencies = undefined;
    public targetCurrencies = {};
    public objectKeys = Object.keys;
    public items = {};
    public base = {};
    public conversionResult = '';
    public subs = new Array<Subscription>();
    private defaultBase = 'EUR';
    public payload: CurrencyFormPayload;
    public selectedTargetCurrencyCode = undefined;
    public sub_1: Subscription;

    // form
    public currencyConverterForm = new FormGroup({
        selBaseCurrency: new FormControl('', [Validators.required]),
        selTargetCurrency: new FormControl('', [Validators.required]),
        txtAmount: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)])
    });

    @ViewChild('selTargetCurrency') selTargetCurrency: ElementRef;

    constructor(
        protected currencyConverterService: CurrencyConverterService
    ) {
        this.baseCurrencies = BASE_CURRENCIES;
        this.currencyConverterForm.controls.selBaseCurrency.setValue(this.defaultBase);
    }

    ngOnInit() {
        this.applySubscription(this.defaultBase);
    }

    populateTargetCurrentList(event: Event) {
        if (event) {
            const target = event.target;
            this.applySubscription(target['value']);
            this.currencyConverterForm.controls.selTargetCurrency.setValue('');
        }
    }

    selectTargetCurrent(event: Event) {
        const target = event.target;
        const selectedIndex = target['options'].selectedIndex;
        const selectElementText = (<HTMLOptionElement>target['options'][selectedIndex]).text;
        this.selectedTargetCurrencyCode = selectElementText.trim();
    }

    applySubscription(selectedValue: string) {
        this.currencyConverterService.getLatestRatesByBaseCurrency(selectedValue).subscribe((value: ExchangeRates) => {
            this.targetCurrencies = value.rates;
        });
    }

    performConversion() {

        if (!this.currencyConverterForm.valid) {

            for (const i in this.currencyConverterForm.controls) {
                if (this.currencyConverterForm.controls.hasOwnProperty(i)) {
                    this.currencyConverterForm.controls[i].markAsTouched();
                }
            }
        } else {

            this.payload = {
                base: <string>this.currencyConverterForm.controls.selBaseCurrency.value,
                target: <number>this.currencyConverterForm.controls.selTargetCurrency.value,
                amount: <number>this.currencyConverterForm.controls.txtAmount.value
            };

            this.conversionResult = this.currencyConverterService.getCurrencySymbolByCode(this.payload.base) + this.payload.amount + ' = ';
            this.conversionResult += this.currencyConverterService.getCurrencySymbolByCode(this.selectedTargetCurrencyCode);
            this.conversionResult += this.currencyConverterService.convertCurrency(this.payload);
        }
    }

    ngOnDestroy() {
        this.subs.forEach((sub: Subscription) => {
            if (sub) {
                sub.unsubscribe();
            }
        });
    }
}
