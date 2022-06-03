import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DemandePart } from '../model/partenaire-model';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  
  baseURL=environment.Api+"api/admin/";

  constructor(private http:HttpClient) { }

  getDemandes ():Observable<any>{
    return this.http.get<DemandePart>(`${this.baseURL}`+'getDemandePart');
  }

  Approuved(id_part:number):Observable<any>{
    return this.http.put<any>(`${this.baseURL}`+'/aprouverPartenaire/'+id_part,{})
  }

  Delete(id_part:number):Observable<any>{
    return this.http.delete<any>(`${this.baseURL}`+'/deleteDemande/'+id_part)
  }
}
