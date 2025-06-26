import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl',
  standalone: true,
})
export class ImgUrlPipe implements PipeTransform {
  transform(value: string | string[] | null | undefined): string | string[] {
    if (!value) return [];

    if (Array.isArray(value)) {
      return value.map(url => url.replace(/'/g, '%27'));
    }

    return value.replace(/'/g, '%27');
  }
}
