import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pCardinal'
})
export class PCardinalPipe implements PipeTransform {

  transform(value: string): string {
    const map: any = {
      C: 'CENTRO',
      N: 'NORTE',
      S: 'SUR',
      E: 'ESTE',
      O: 'OESTE'
    };
    return map[value] || value;
  }

}
