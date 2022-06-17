import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../model/Admin';
import { Client } from '../model/client_model';
import { Config } from '../model/config-model';
import { Partenaires } from '../model/partenaire-model';
import { AddStore, Store } from '../model/store-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  baseURL=environment.Api+"api/admin/";
  url=environment.Api+"api/partenaires/";
  __url = environment.Api+'api/files/upload';

  login (admin : Admin):Observable<any>{
    return this.http.post<Admin>(`${this.baseURL}`+'login' , admin);
  }
  getUsers ():Observable<any>{
    return this.http.get<any>(`${this.baseURL}`+'getUsers');
  }
  getPartenaire ():Observable<any>{
    return this.http.get<Partenaires>(`${this.baseURL}`+'getPartenaire');
  }
  getPartenaireById (id_part : number):Observable<any>{
    return this.http.get<Partenaires>(`${this.baseURL}`+'getPartenaireById/'+id_part);
  }

  postFile(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file' , file); 
    return this.http.post(this.__url,formData);
  }

  UpdateProfil(partenaire:Partenaires): Observable<any> {
    return this.http.patch<Partenaires>(`${this.url}` + `updatePart`,partenaire);
  }

  Desactivate(etat:number,id_part:number):Observable<any>{
    return this.http.put<any>(`${this.baseURL}`+'deletePartenaire/'+id_part+'/'+etat,{})
  }

  AddPartenaire(partenaireAdd:Partenaires):Observable<any>{
    return this.http.post<Partenaires>(`${this.baseURL}`+'createpartenaire',partenaireAdd)
  }

  //Configuration

  AddConfig(config:Config):Observable<any>{
    return this.http.post<Config>(`${this.baseURL}`+'createConfig',config)
  }

  getConfig(id_part:number):Observable<any>{
    return this.http.get<Config>(`${this.url}`+'getConfig/'+id_part)
  }

  //Boutique

  AddBoutique(store:AddStore):Observable<any>{
    return this.http.post<AddStore>(`${this.baseURL}`+'ajouterBoutique',store)
  }

  getBoutique(id_part:number):Observable<any>{
    return this.http.get<Store>(`${this.baseURL}`+'getAllBoutique/'+id_part)
  }

  deleteBoutique(id_boutique:number):Observable<any>{
    return this.http.delete<any>(`${this.baseURL}`+'deleteBoutique/'+id_boutique)
  }

  getClients():Observable<any>{
    return this.http.get<Client>(`${this.baseURL}`+'getUsers')
  }

  deleteClient(id:number,etat:number):Observable<any>{
    return this.http.put<any>(`${this.baseURL}`+'deleteUser/'+id+'/'+etat,{})
  }

  
  verifConfig(id:number):Observable<any>{
    return this.http.get<any>(`${this.baseURL}`+'verifConfig/'+id)
  }
}
