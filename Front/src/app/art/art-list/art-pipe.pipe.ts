import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'artPipe'
})
export class ArtPipePipe implements PipeTransform {

  transform(value: any, filteredCate: string, propName: string): any {
    if(value.length === 0 || filteredCate === ''){
      return value;
    }   
    const resultArray = []
    for (const item of value) {
      if(item[propName] == filteredCate){
        resultArray.push(item)
      }
    }
    return resultArray;
  }
}
