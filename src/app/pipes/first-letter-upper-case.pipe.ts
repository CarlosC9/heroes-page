import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUpperCase',
  standalone: true
})
export class FirstLetterUpperCasePipe implements PipeTransform {

  transform(value: string): unknown {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  }

}
