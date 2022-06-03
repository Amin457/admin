import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../model/client_model';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(value: Client[],Search:string) {
    if (Search === '' || Search === null || Search === undefined) {
      return value;
    }
    return  value.filter(C =>(C.Nom.toLowerCase().indexOf(Search.toLowerCase()) > -1));
  }

}