export const BASE_CURRENCIES = [
    'JPY', 'BRL', 'NOK', 'DKK', 'RUB', 'BGN', 'SEK', 'CHF',
    'PHP', 'AUD', 'CZK', 'ZAR', 'USD', 'TRY', 'RON', 'MXN',
    'PLN', 'THB', 'ISK', 'CAD', 'HKD', 'NZD', 'KRW', 'SGD',
    'MYR', 'HUF', 'GBP', 'HRK', 'IDR', 'INR', 'ILS', 'CNY',
    'EUR'
];

export interface CurrencyFormPayload {
    base: string;
    target: number;
    amount: number;
}

export interface Rates {
    MXN?: number;
    AUD?: number;
    HKD?: number;
    RON?: number;
    HRK?: number;
    CHF?: number;
    IDR?: number;
    CAD?: number;
    USD?: number;
    ZAR?: number;
    JPY?: number;
    BRL?: number;
    HUF?: number;
    CZK?: number;
    NOK?: number;
    INR?: number;
    PLN?: number;
    ISK?: number;
    PHP?: number;
    SEK?: number;
    ILS?: number;
    GBP?: number;
    SGD?: number;
    CNY?: number;
    TRY?: number;
    MYR?: number;
    RUB?: number;
    NZD?: number;
    KRW?: number;
    THB?: number;
    BGN?: number;
    DKK?: number;
}

export interface ExchangeRates {
    rates: Rates;
    base: string;
    date: string;
}

export enum RatesQueryType {
    User,
    Init
}