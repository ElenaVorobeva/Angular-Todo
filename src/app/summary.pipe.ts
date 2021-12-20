import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(value: string): string {
    if (value && value.length > 45) {
      return value.substring(0, 45) + '...';
    }

    return value;
  }

}
