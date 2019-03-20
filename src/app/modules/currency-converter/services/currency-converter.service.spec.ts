import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ExchangeRates } from './../models/currency-converter.model';
import { CurrencyConverterService } from './currency-converter.service';

describe('CurrencyConverterService', () => {
    let service: CurrencyConverterService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CurrencyConverterService
            ]
        });
        service = TestBed.get(CurrencyConverterService);
    });
    it('can load instance', () => {
        expect(service).toBeTruthy();
    });
    it('currentExchangeRates defaults to: undefined', () => {
        expect(service.currentExchangeRates).toEqual(undefined);
    });

    it('should return an Observable<ExchangeRates>', fakeAsync(() => {

        const response = <ExchangeRates>{
            rates: {
                GBP: 0.85415
            },
            base: 'EUR',
            date: '2018-04-08',
        };

        service.getLatestRatesByBaseCurrency('EUR').subscribe((value: any) => {
            expect(value.rates.GBP).toEqual(response.rates.GBP);
        });

        tick();

        const httpMockCon: HttpTestingController = TestBed.get(HttpTestingController);
        const call = httpMockCon.expectOne(`${service.exchangeRateUrl}?base=EUR`);
        expect(call.request.method).toBe('GET');

        call.flush(response);
        httpMockCon.verify();
    }));

    it('convertCurrency to return correct converted value', () => {

        const payload = {
            base: 'EUR',
            target: 0.85415,
            amount: 10
        };

        const result = service.convertCurrency(payload);
        expect(result).toEqual('8.54');
    });

    it('getCurrencySymbolByCode returns correct code', () => {
        const euroCode = service.getCurrencySymbolByCode('GBP');
        expect(euroCode).toEqual('£');
    });

});
