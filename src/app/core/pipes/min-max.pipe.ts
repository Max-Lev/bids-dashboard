import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minMax'
})
export class MinMaxPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
