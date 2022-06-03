import { Pipe, PipeTransform } from '@angular/core';
import { Partenaires } from '../model/partenaire-model';
@Pipe({
  name: 'partenaire'
})
export class PartenairePipe implements PipeTransform {

  transform(value: Partenaires[], Search: string) {
    if (Search === '' || Search === null || Search === undefined) {
      return value;
    }
    return  value.filter(p =>(p.societe.toLowerCase().indexOf(Search.toLowerCase()) > -1));
  }
  

}
