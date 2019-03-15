import { ExchangeRates, CurrencyFormPayload } from './../models/currency-converter.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CurrencyConverterService {
    private exchangeRateUrl = environment.api.domain + environment.api.endpoints.latest;
    public currentExchangeRates: ExchangeRates = undefined;
    public shareLatestRates = new Subject<any>();

    constructor(protected http: HttpClient) {
        const _self = this;
        this.getLatestRates().subscribe((value: ExchangeRates) => {
            console.log(value);
            _self.currentExchangeRates = value;
            this.shareLatestRates.next(value);
        });
    }

    getLatestRates() {
        return this.http.get(this.exchangeRateUrl);
    }

    getLatestRatesByBaseCurrency(code: string) {
        return this.http.get(this.exchangeRateUrl + '?base=' + code);
    }

    convertCurrency(payload: CurrencyFormPayload) {
        console.log(payload);
        const exchangeFactor = payload.target * payload.amount;
        return exchangeFactor.toFixed(2);
    }
}
