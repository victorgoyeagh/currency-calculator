import { ExchangeRates, Rates, CurrencyFormPayload } from './../models/currency-converter.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription, Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class CurrencyConverterService {
    public exchangeRateUrl = environment.api.domain + environment.api.endpoints.latest;
    public currentExchangeRates: ExchangeRates = undefined;

    constructor(protected http: HttpClient) {
    }

    getLatestRatesByBaseCurrency(code: string): Observable<ExchangeRates> {
        return <Observable<ExchangeRates>>this.http.get<ExchangeRates>(this.exchangeRateUrl + '?base=' + code);
    }

    convertCurrency(payload: CurrencyFormPayload) {
        const exchangeFactor = payload.target * payload.amount;
        return exchangeFactor.toFixed(2);
    }

    getCurrencySymbolByCode(code: string): string {
        return Number().toLocaleString(undefined, { style: 'currency', currency: code }).slice(0, 1);
    }

}
