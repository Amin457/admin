import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../model/client_model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  Search ='';
  client:Client[]=[];
  imgUrl = environment.Api + 'api/files/get/';

  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.service.getClients().subscribe(res=>{
      this.client=res.data;
      
    })
  }

  ChangeEtat(id:number, etat:number){
    this.service.deleteClient(id,etat).subscribe(res=>{
      this.service.getClients().subscribe(res=>{
        this.client=res.data;
        
      })
    })
  }

  date(date1 : Date) {

    let datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(new Date(date1),'yyyy-MM-dd');
  }
}
