import { of, Subscription } from 'rxjs';
import { ExchangeRates } from './../models/currency-converter.model';
import { ComponentFixture, TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { CurrencyConverterService } from './../services/currency-converter.service';
import { CurrencyConverterComponent } from './currency-converter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


describe('CurrencyConverterComponent', () => {
    let component: CurrencyConverterComponent;
    let fixture: ComponentFixture<CurrencyConverterComponent>;

    beforeEach(() => {
        const currencyConverterServiceStub = {
            getLatestRatesByBaseCurrency: () => ({ subscribe: () => ({}) }),
            getCurrencySymbolByCode: () => ({}),
            convertCurrency: () => ({})
        };
        TestBed.configureTestingModule({
            declarations: [CurrencyConverterComponent],
            imports: [ReactiveFormsModule, FormsModule],
            providers: [
                {
                    provide: CurrencyConverterService,
                    useValue: currencyConverterServiceStub
                }
            ]
        });
        fixture = TestBed.createComponent(CurrencyConverterComponent);
        component = fixture.componentInstance;
    });

    it('object of type ExchangeRates returned', () => {
        const currencyConverterService = TestBed.get(CurrencyConverterService);
        const response: ExchangeRates = {
            rates: {
                GBP: 0.85415
            },
            base: 'EUR',
            date: '2018-04-08',
        };

        const spyObj = spyOn(currencyConverterService, 'getLatestRatesByBaseCurrency').and.returnValue(of(response));
        component.ngOnInit();
        fixture.detectChanges();
        expect(spyObj).toHaveBeenCalled();
        expect(component.targetCurrencies['GBP']).toEqual(response.rates.GBP);
    });

    describe('CurrencyConverterComponent', () => {

        beforeEach(() => {

            const response: ExchangeRates = {
                rates: {
                    GBP: 0.85415
                },
                base: 'EUR',
                date: '2018-04-08',
            };

            const baseCur = 'EUR',
                targetCur = '0.85415',
                convAmount = '10';

            component.currencyConverterForm.controls.selBaseCurrency.setValue(baseCur);
            component.currencyConverterForm.controls.selTargetCurrency.setValue(targetCur); // GBP
            component.currencyConverterForm.controls.txtAmount.setValue(convAmount);

            fixture.detectChanges();
        });

        it('currencyConverterForm validation works', fakeAsync(() => {

            expect(component.currencyConverterForm.valid).toEqual(true);
            component.currencyConverterForm.controls.txtAmount.setValue('hghghghh');
            fixture.detectChanges();
            expect(component.currencyConverterForm.valid).toBeFalsy();
        }));

        xit('should perform performConversion and result displays in view', fakeAsync(() => {

            const spyApplySubscription = spyOn(component, 'applySubscription');
            const spyPopulateTargetCurrentList = spyOn(component, 'populateTargetCurrentList');
            const debSelBaseCurrency = fixture.debugElement.query(By.css('#selBaseCurrency'));
            const selBaseCurrency = <HTMLSelectElement>debSelBaseCurrency.nativeElement;
            selBaseCurrency.value = 'EUR';
            selBaseCurrency.dispatchEvent(new Event('change'));

            fixture.detectChanges();

            expect(spyPopulateTargetCurrentList).toHaveBeenCalled();

            const debSelTargetCurrency = fixture.debugElement.query(By.css('#selTargetCurrency'));
            const selTargetCurrency = <HTMLSelectElement>debSelTargetCurrency.nativeElement;

            expect(selTargetCurrency.value).toEqual('');

            /*component.targetCurrencies = response;
            fixture.detectChanges();

            const spySelectTargetCurrent = spyOn(component, 'selectTargetCurrent');
            selTargetCurrency.selectedIndex = 27;
            selTargetCurrency.value = '0.85548';
            selBaseCurrency.dispatchEvent(new Event('change'));

            component.selectedTargetCurrencyCode = '0.85548';

            fixture.detectChanges();

            console.log(selTargetCurrency['options']);*/

            // expect(spySelectTargetCurrent).toHaveBeenCalled();

            /*fixture.detectChanges();

            //const submitBtn = fixture.debugElement.query(By.css('#btnPerformConversion'));
            //(<HTMLButtonElement>submitBtn.nativeElement).dispatchEvent(new Event('click'));
            //expect(component.selectedTargetCurrencyCode).toEqual('GBP');*/
        }));


    });
});
