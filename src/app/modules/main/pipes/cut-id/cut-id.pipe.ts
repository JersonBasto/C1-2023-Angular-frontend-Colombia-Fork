import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutId',
})
export class CutIdPipe implements PipeTransform {
  transform(id: string): string {
    let newId = '';
    let arr = id.split('-');
    newId = arr[0];
    return newId;
  }
}
