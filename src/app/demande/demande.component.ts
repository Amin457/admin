import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Config } from '../model/config-model';
import { DemandePart } from '../model/partenaire-model';
import { AddStore, Store } from '../model/store-model';
import { DemandeService } from '../services/demande.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  @ViewChild('Details', { static: false }) myModal!: ElementRef;
  elm!: HTMLElement;

  listDemandes: DemandePart[] = [];
  imgUrl = environment.Api + 'api/files/get/';
  id_part!: number;


  //ngModel Configuration
  adresseIP!: string;
  env!: string;
  storeID!: number;
  dbID!: string;
  config: Config = new Config();

  //ngModel Boutique
  store!:string;
  addStore:AddStore = new AddStore();
  listStore:Store []=[];
  id_boutique!:number;
  constructor(private service: DemandeService,private userservice: UserService) { }

  ngOnInit(): void {

    this.service.getDemandes().subscribe(res => {
      this.listDemandes = res.data;
      console.log(this.listDemandes);
    })
  }
  @ViewChild('Config', { static: false }) myModelConfig!: ElementRef;
  elmConfig!: HTMLElement;
  @ViewChild('Store', { static: false }) myModelStore!: ElementRef;
  elmStore!: HTMLElement;
  @ViewChild('AddStore', { static: false }) myModalAddStore!: ElementRef;
  elmAddStore!: HTMLElement;

  ngAfterViewInit(): void {
    this.elmConfig = this.myModelConfig.nativeElement as HTMLElement;
    this.elmStore = this.myModelStore.nativeElement as HTMLElement;
    this.elmAddStore = this.myModalAddStore.nativeElement as HTMLElement;
    this.elm = this.myModal.nativeElement as HTMLElement;
    this.service.getDemandes().subscribe(res => {
      this.listDemandes = res.data;
      console.log(this.listDemandes);
    })
  }
  ///model details
  close(): void {
    this.elm.classList.remove('show');
    setTimeout(() => {
      this.elm.style.width = '0';
    }, 75);
  }
  open(): void {
    this.elm.classList.add('show');
    this.elm.style.width = '100vw';
    this.service.getDemandes().subscribe(res => {
      this.listDemandes = res.data;
      console.log(this.listDemandes);
    })
  }
///// model config
openConfig1(id_part:number){
  this.elmConfig.classList.add('show');
  this.elmConfig.style.width = '100vw';
  this.id_part = id_part;
  this.userservice.getConfig(id_part).subscribe(
    (res) => {
      this.adresseIP=res.results[0].adresseIP;
      this.env=res.results[0].env;
      this.storeID=res.results[0].storeID;
      this.dbID=res.results[0].dbId;
      
    },
    error => {
      console.log(error);
    });
}
closeConfig(): void {
  this.elmConfig.classList.remove('show');
  setTimeout(() => {
    this.elmConfig.style.width = '0';
  }, 75);

/*  this.userservice.getPartenaire().subscribe(
    (res) => {
      this.partenaires = res.data;
      console.log(this.partenaires);

      return false;

    },
    error => {
      console.log(error);
    });*/
}



///////

AddConfig1(){
  if(this.adresseIP=='' || this.env=='' || this.dbID=='' || this.storeID<4){
    Swal.fire('invalide', 'Vérifier les champs', 'error');
  }
  else{
    this.config.adresseIP=this.adresseIP;
    this.config.dbId=this.dbID;
    this.config.env=this.env;
    this.config.storeID=this.storeID;
    this.config.id_part=this.id_part;
    this.userservice.AddConfig(this.config).subscribe(res=>{
      console.log(res);
      this.openStore(this.id_part);
      Swal.fire({
        icon: 'success',
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
  
  }

//Boutique
openStore(id_part:number): void {
  this.elmStore.classList.add('show');
  this.elmStore.style.width = '100vw';
  this.id_part=id_part;
  
  this.userservice.getBoutique(this.id_part).subscribe(res=>{
    this.listStore=res.data;
    console.log(this.listStore)
  });
}

closeStore(): void {
  this.elmStore.classList.remove('show');
  setTimeout(() => {
    this.elmStore.style.width = '0';
  }, 75);
}

//Ajouter Boutique

openAddStore(): void {
  this.elmAddStore.classList.add('show');
  this.elmAddStore.style.width = '100vw';
  
}

closeAddStore(): void {
  this.elmAddStore.classList.remove('show');
  setTimeout(() => {
    this.elmAddStore.style.width = '0';
  }, 75);
}

addstore(){
  
  this.addStore.id_part=this.id_part;
  this.addStore.boutique=this.store;
  console.log(this.addStore);
  if(this.store==undefined||this.store==""){
    Swal.fire('invalide', 'Vérifier les champs', 'error');
  }else{
  this.userservice.AddBoutique(this.addStore).subscribe(res=>{
    console.log(res);
    Swal.fire({
      icon: 'success',
      title:  'Boutique '+this.store+' a été ajouté',
      showConfirmButton: false,
      timer: 1500
    })
    this.approuved(this.id_part);
    this.closeAddStore();
    this.closeStore();
    this.closeConfig();
    this.store='';
    this.userservice.getBoutique(this.id_part).subscribe(res=>{
      this.listStore=res.data;
    });
  })
}
}

deleteBoutique(id_boutique:number){

  Swal.fire({
    title: 'Vous etes sure de supprimer ce boutique?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui',
    cancelButtonText: 'Non',
  }).then((result) => {
    if (result.value) {
      this.id_boutique=id_boutique;
    this.userservice.deleteBoutique(this.id_boutique).subscribe(res=>{
    this.userservice.getBoutique(this.id_part).subscribe(res=>{
      this.listStore=res.data;
    });

  })

    } else if (result.dismiss === Swal.DismissReason.cancel) {
    }
  });
  
}

  approuved(id_part: number) {

    
    this.service.Approuved(id_part).subscribe(res => {
      Swal.fire('Félicitation nouveau partenaire ajouté' , 'success');
      this.service.getDemandes().subscribe(res => {
        this.listDemandes=res.data;
      })
    })
  }

  delete(id_part: number,societe:string) {

    this.service.Delete(id_part).subscribe(res=>{
      Swal.fire('Annulé', 'Vous avez refusé la demande de '+societe, 'error');
      this.service.getDemandes().subscribe(res => {
        this.listDemandes=res.data;
        
      })
    })
  }
}
