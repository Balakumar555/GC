import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'dynamic',
  standalone: true,
})
export class DynamicPipe implements PipeTransform {
  constructor(
   // private currencyPipe: CurrencyPipe,
    //private datePipe: DatePipe,
    //private decimalPipe: DecimalPipe
  ) {}
  private currencyPipe = inject(CurrencyPipe); 
  private datePipe = inject(DatePipe);
  private decimalPipe = inject(DecimalPipe);
  transform(value: any, pipeToken: any, pipeArgs: any[]): any {
    let pipe: PipeTransform;
    switch (pipeToken) {
      case 'date':
        return this.datePipe.transform(value, ...pipeArgs) || '';
      case 'currency':
        return this.currencyPipe.transform(value, ...pipeArgs) || '';
      case 'formatNullToDashOrCurrency':
        if (value == null) {
          return '--';
        }
        if (typeof value === 'number') {
          return (
            this.currencyPipe.transform(value, pipeArgs[0], 'symbol') || ''
          );
        }
        return value;
      case 'emptyValue':
        return value === null || value === undefined || value === ''
          ? '--'
          : value;
      case 'decimalFormat':
        return this.decimalPipe.transform(value, '1.2-2') || '';
      case 'number':
        return this.decimalPipe.transform(value, ...pipeArgs) || '';
      case 'percent':
        return value + '' + '%';
    //   case 'phone':
    //     if (!value) return '--';
    //     if (value) {
    //       value = value.toString();
    //       value = value.replace(/\D/g, '');
    //       // Format the phone number
    //       if (value.length === 10) {
    //         return (${value.substring(0, 3)}) ${value.substring(
    //           3,
    //           6
    //         )}-${value.substring(6)};
    //       }
    //     }
      //  break;
    //    case 'decimalToFraction':
        // if (!value) return '';
        // if (value == '--') return '--';
        // let parts = Math.floor(value).toString();
        // let x = value - Math.floor(value);
        // const fractionMap: { [key: number]: string } = {
        //   0.1: '1/8',
        //   0.2: '1/4',
        //   0.3: '3/8',
        //   0.4: '1/2',
        //   0.6: '3/4',
        //   0.7: '7/8',
        //   0.125: '1/8',
        //   0.25: '1/4',
        //   0.375: '3/8',
        //   0.5: new Date().getFullYear() <= 2024 ? '5/8' : '1/2',
        //   0.625: '5/8',
        //   0.75: '3/4',
        //   0.875: '7/8',
        // };
        // return fractionMap[x] ? ${parts} ${fractionMap[x]} : parts;
    //   case 'speed':
    //     if (!value) return '--';
    //     const match = value.match(/[\d.]+/); // Extract numeric part
    //     if (!match) return value; // Return unchanged if no number found
    //     const numberPart = parseFloat(match[0]); // Convert to number
    //     const formattedNumber = Number.isInteger(numberPart)
    //       ? ${numberPart}.0
    //       : numberPart;
    //     return value.replace(match[0], formattedNumber.toString());
      case 'ReplaceZeroNullPipe':
        return value === 0 || value === null ? '--' : value;
      case 'DynamicPipe':
        if (value === null || value === undefined || value === '') {
          return '';
        }
        if (typeof value === 'number') {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value);
        }
        if (typeof value === 'string') {
          return value;
        }
        return '';
      default:
        return value;
    }
  }
}