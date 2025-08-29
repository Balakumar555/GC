import { CurrencyPipe, DatePipe, DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'dynamic',
    standalone: true,
})
export class DynamicPipe implements PipeTransform{

    constructor(private currencyPipe: CurrencyPipe,
                private datePipe: DatePipe,
                private decimalPipe: DecimalPipe
    ){

    }
    transform(value: any, ...args: any[]) {
        throw new Error("Method not implemented.");
    }

}