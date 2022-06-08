import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Partenaires } from '../model/partenaire-model';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Config } from '../model/config-model';
import { AddStore, Store } from '../model/store-model';

@Component({
  selector: 'app-partenaire',
  templateUrl: './partenaire.component.html',
  styleUrls: ['./partenaire.component.css']
})
export class PartenaireComponent implements OnInit {
  Search ='';


  closeResult: string = '';
  partenaires: Partenaires[]=[];
  imgUrl = environment.Api + 'api/files/get/';
  nom!: string;
  tel!: string;
  mail!: string;
  fax!: string;
  codePostal!: any;
  mdp!: string;
  id_part!: number;
  selectedFile: any;
  file: any;
  form!: FormGroup;
  partenaire: Partenaires = new Partenaires();
  partenaireUpdated: Partenaires = new Partenaires();

  //ngModel Add Partenaire
  nomAdd!: string;
  telAdd!: string;
  mailAdd!: string;
  faxAdd!: string;
  codePostalAdd!: any;
  mdpAdd!: string;
  selectedFileAdd: any;
  fileAdd: any;
  partenaireAdd: Partenaires = new Partenaires();

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

  constructor(private service: UserService) {

  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  //Add partenaire
  onFileSelectedAdd(event: any) {
    this.fileAdd = event.target.files[0];
  }


  ngOnInit(): void {
    this.service.getPartenaire().subscribe(
      (res) => {
        console.log(res)
        this.partenaires = res.data;
        console.log(this.partenaires);
        return false;
      },
      error => {
        console.log(error);
      });
  }

  @ViewChild('Edit', { static: false }) myModal!: ElementRef;
  elm!: HTMLElement;
  @ViewChild('Add', { static: false }) myModelAdd!: ElementRef;
  elmAdd!: HTMLElement;
  @ViewChild('Config', { static: false }) myModelConfig!: ElementRef;
  elmConfig!: HTMLElement;
  @ViewChild('Store', { static: false }) myModelStore!: ElementRef;
  elmStore!: HTMLElement;
  @ViewChild('AddStore', { static: false }) myModalAddStore!: ElementRef;
  elmAddStore!: HTMLElement;
  ngAfterViewInit(): void {
    this.elm = this.myModal.nativeElement as HTMLElement;
    this.elmAdd = this.myModelAdd.nativeElement as HTMLElement;
    this.elmConfig = this.myModelConfig.nativeElement as HTMLElement;
    this.elmStore = this.myModelStore.nativeElement as HTMLElement;
    this.elmAddStore = this.myModalAddStore.nativeElement as HTMLElement;

  }
  close(): void {
    this.elm.classList.remove('show');
    setTimeout(() => {
      this.elm.style.width = '0';
    }, 75);

    this.service.getPartenaire().subscribe(
      (res) => {
        this.partenaires = res.data;
        console.log(this.partenaires);

        return false;

      },
      error => {
        console.log(error);
      });
  }

  //close add partenaire
  closeAdd(): void {
    this.elmAdd.classList.remove('show');
    setTimeout(() => {
      this.elmAdd.style.width = '0';
    }, 75);

    this.service.getPartenaire().subscribe(
      (res) => {
        this.partenaires = res.data;
        console.log(this.partenaires);

        return false;

      },
      error => {
        console.log(error);
      });
  }
  open(id_part: number): void {
    this.elm.classList.add('show');
    this.elm.style.width = '100vw';
    this.id_part = id_part;
    this.service.getPartenaireById(id_part).subscribe(
      (res) => {
        console.log(res);
        this.partenaire = res.data[0];

        console.log(this.partenaire);
        this.nom = this.partenaire.societe;
        this.fax = this.partenaire.Fax;
        this.tel = this.partenaire.tel;
        this.mail = this.partenaire.mail;
        this.mdp = this.partenaire.mdp;
        this.codePostal = this.partenaire.codePostal;
      },
      error => {
        console.log(error);
      });
  }
  //Add partenaire
  openAdd(): void {
    this.elmAdd.classList.add('show');
    this.elmAdd.style.width = '100vw';
  }



  update() {
    this.partenaireUpdated.mail = this.mail;
    this.partenaireUpdated.societe = this.nom;
    this.partenaireUpdated.mdp = this.mdp;
    this.partenaireUpdated.tel = this.tel;
    this.partenaireUpdated.id_part = this.id_part;
    this.partenaireUpdated.Fax = this.fax;
    this.partenaireUpdated.codePostal = this.codePostal;
    if (this.nom == '' || this.fax.length < 8 || this.mdp.length < 8 || this.codePostal.length < 4 || this.tel.length < 8 || this.mail == '') {
      Swal.fire('invalide', 'Vérifier les champs', 'error');
    } else if (this.file == undefined) {
      this.partenaireUpdated.img = this.partenaire.img;
      console.log(this.partenaireUpdated);
      this.service.UpdateProfil(this.partenaireUpdated).subscribe(res => {
        console.log(res);
        this.successNotification();
          this.close();
      })
    } else {
      this.service.postFile(this.file).subscribe(res => {
        this.partenaireUpdated.img = res.data;
        console.log(this.partenaireUpdated);
        this.service.UpdateProfil(this.partenaireUpdated).subscribe(res => {
          console.log('updated');
          this.successNotification();
          this.close();
        })
      })
    }


  }

  //les alerts
  successNotification() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Mise à jours avec succés',
      showConfirmButton: false,
      timer: 1500
    })
  }


  desactiver(id_part: number, etat: number) {
    Swal.fire({
      title: 'Vous etes sure de désactiver ce partenaire?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Ce partenaire est désactivé',
          showConfirmButton: false,
          timer: 1500
        })
        this.service.Desactivate(etat, id_part).subscribe(res => {
          this.service.getPartenaire().subscribe(
            (res) => {
              this.partenaires = res.data;
              console.log(this.partenaires);
              return false;
            },
            error => {
              console.log(error);
            });

        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Annuler', 'Ce partenaire reste activé.)', 'error');
      }
    });
  }



  Activer(id_part: number, etat: number) {
    Swal.fire({
      title: 'Vous etes sure d"activer ce partenaire?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.value) {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Ce partenaire est activé',
          showConfirmButton: false,
          timer: 1500
        })

        this.service.Desactivate(etat, id_part).subscribe(res => {
          this.service.getPartenaire().subscribe(
            (res) => {
              this.partenaires = res.data;
              console.log(this.partenaires);
              return false;
            },
            error => {
              console.log(error);
            });

        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Ce partenaire reste désactivé.',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

  AddPartenaire() {
    this.partenaireAdd.societe = this.nomAdd;
    this.partenaireAdd.Fax = this.faxAdd;
    this.partenaireAdd.codePostal = this.codePostalAdd;
    this.partenaireAdd.mail = this.mailAdd;
    this.partenaireAdd.mdp = this.mdpAdd;
    this.partenaireAdd.tel = this.telAdd;
    if (this.nomAdd == '' || this.faxAdd.length < 8 || this.mdpAdd.length < 8 || this.codePostalAdd == '' || this.mailAdd == '' ||  this.telAdd.length < 8) {
      Swal.fire('invalide', 'Vérifier les champs', 'error');
    } else {
      this.service.postFile(this.fileAdd).subscribe(res => {
        this.partenaireAdd.img = res.data;
        this.service.AddPartenaire(this.partenaireAdd).subscribe(res => {
          console.log(res.data[0].id_part);
          this.id_part=res.data[0].id_part;
          console.log('ajouté');
          
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Partenaire ajouté avec succés',
            showConfirmButton: false,
            timer: 1500
          })
          this.closeAdd();
          this.openConfig();
        })
      })
    }
  }

  //Configuration

  openConfig(): void {
    this.elmConfig.classList.add('show');
    this.elmConfig.style.width = '100vw';
    
  }
  openConfig1(id_part:number){
    this.elmConfig.classList.add('show');
    this.elmConfig.style.width = '100vw';
    this.id_part = id_part;
    this.service.getConfig(id_part).subscribe(
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

    this.service.getPartenaire().subscribe(
      (res) => {
        this.partenaires = res.data;
        console.log(this.partenaires);

        return false;

      },
      error => {
        console.log(error);
      });
  }


AddConfig(){
if(this.adresseIP=='' || this.env=='' || this.dbID=='' || this.storeID<4){
  Swal.fire('invalide', 'Vérifier les champs', 'error');
}
else{
  this.config.adresseIP=this.adresseIP;
this.config.dbId=this.dbID;
this.config.env=this.env;
this.config.storeID=this.storeID;
  this.service.AddConfig(this.config).subscribe(res=>{
    console.log(res);
   
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: res.message,
      showConfirmButton: false,
      timer: 1500
    })
  })
}

}

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
    this.service.AddConfig(this.config).subscribe(res=>{
      console.log(res);
      Swal.fire({
        position: 'top-end',
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
  
  this.service.getBoutique(this.id_part).subscribe(res=>{
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
  this.service.AddBoutique(this.addStore).subscribe(res=>{
    console.log(res);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title:  'Boutique '+this.store+' a été ajouté',
      showConfirmButton: false,
      timer: 1500
    })

    this.store='';
    
  })
}

deleteBoutique(id_boutique:number){

  this.id_boutique=id_boutique;
  this.service.deleteBoutique(this.id_boutique).subscribe(res=>{
    this.service.getBoutique(this.id_part).subscribe(res=>{
      this.listStore=res.data;
    });

  })
}

}


