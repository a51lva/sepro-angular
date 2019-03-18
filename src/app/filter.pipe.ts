import { Pipe, PipeTransform } from '@angular/core';
import { Offer } from './offer';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: Offer): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.location.indexOf(filter.location) !== -1);
  }

}
