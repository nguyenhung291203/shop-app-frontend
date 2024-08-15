import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date, format: string = 'dd/MM/yyyy'): string {
    if (value) {
      const date = new Date(value);
      return this.formatDate(date, format);
    }
    return '';
  }

  private formatDate(date: Date, format: string): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return format
      .replace('yyyy', year.toString())
      .replace('MM', month)
      .replace('dd', day);
  }
}
