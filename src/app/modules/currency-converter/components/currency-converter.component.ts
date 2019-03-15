import { ExchangeRates, CurrencyFormPayload } from './../models/currency-converter.model';
import { CurrencyConverterService } from './../services/currency-converter.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-currency-converter',
    templateUrl: './currency-converter.component.html',
    styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
    public targetCurrency = {};
    objectKeys = Object.keys;
    public items = {};
    public base = {};
    public conversionResult: string = undefined;

    // form
    public currencyConverterForm = new FormGroup({
        selBaseCurrency: new FormControl('', [Validators.required]),
        selTargetCurrency: new FormControl('', [Validators.required]),
        txtAmount: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)])
    });

    constructor(
        protected currencyConverterService: CurrencyConverterService
    ) { }

    ngOnInit() {
        this.currencyConverterService.shareLatestRates.subscribe((value: ExchangeRates) => {
            this.items = value.rates;
        });
    }

    popullateTargetCurrentList(event: Event) {
        const selectedValue = event.target['value'];
        this.currencyConverterService.getLatestRatesByBaseCurrency(selectedValue).subscribe((value: ExchangeRates) => {
            console.log(value.rates);
            this.targetCurrency = value.rates;
        });
    }

    performConversion() {

        if (!this.currencyConverterForm.valid) {

            for (let i in this.currencyConverterForm.controls) {
                this.currencyConverterForm.controls[i].markAsTouched();
            }
        } else {

            const payload: CurrencyFormPayload = {
                base: <number>this.currencyConverterForm.controls.selBaseCurrency.value,
                target: <number>this.currencyConverterForm.controls.selTargetCurrency.value,
                amount: <number>this.currencyConverterForm.controls.txtAmount.value
            };

            this.conversionResult = this.currencyConverterService.convertCurrency(payload);
            console.log(this.conversionResult);
        }
    }
}
