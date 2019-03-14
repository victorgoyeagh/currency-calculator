import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterComponent } from './components/currency-converter.component';
import { CurrencyConverterService } from './services/currency-converter.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    providers: [CurrencyConverterService],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule
    ],
    declarations: [CurrencyConverterComponent],
    exports: [CurrencyConverterComponent]
})
export class CurrencyConverterModule { }
