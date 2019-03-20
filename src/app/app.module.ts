import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CurrencyConverterModule } from './modules/currency-converter/currency-converter.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CurrencyConverterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
