import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DemandePart } from '../model/partenaire-model';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  constructor(private http:HttpClient) { }
  baseURL=environment.Api+"api/admin/";

  statPartenaires (obj:any):Observable<any>{
    return this.http.post<any>(`${this.baseURL}`+'statistiquePartenaire',obj);
  }

  statUser (obj:any):Observable<any>{
    return this.http.post<any>(`${this.baseURL}`+'statistiqueUser',obj);
  }

  statCarte ():Observable<any>{
    return this.http.get<any>(`${this.baseURL}`+'statistiqueCarte');
  }
  
  statDashbord ():Observable<any>{
    return this.http.get<any>(`${this.baseURL}`+'statistiqueDashbord');
  }

}
