import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Partenaires } from 'src/app/model/partenaire-model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { emailValidator } from '../email-validator.directive';

@Component({
  selector: 'app-addpart',
  templateUrl: './addpart.component.html',
  styleUrls: ['./addpart.component.css']
})
export class AddpartComponent implements OnInit {
  showPassword: boolean=false;
  reactiveForm!: FormGroup;
  id_part!: number;
  selectedFileAdd: any;
  fileAdd: any;
  partenaireAdd: Partenaires = new Partenaires();
  constructor(private service: UserService) { }
  onFileSelectedAdd(event: any) {
    this.fileAdd = event.target.files[0];
  }
  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      societe1: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
      ]),
      mail1: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        emailValidator(),
      ]),
      mdp1: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      codePostal1: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(6),
      ]),
      tel1: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10)
        ]),
      img1: new FormControl("", [
        Validators.required,
      ]),
      Fax1: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
      ])
    });
  }
  get Fax1() {
    return this.reactiveForm.get('Fax1')!;
  }
  
  get img1() {
    return this.reactiveForm.get('img1')!;
  }
  
  get tel1(){
    return this.reactiveForm.get('tel1')!;
  
  }
  get societe1() {
    return this.reactiveForm.get('societe1')!;
  }
  
  get mail1() {
    return this.reactiveForm.get('mail1')!;
  }
  
  get mdp1() {
    return this.reactiveForm.get('mdp1')!;
  }
  
  get codePostal1(){
    return this.reactiveForm.get('codePostal1')!;
  
  }

  public validate(){
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    console.log(this.reactiveForm.value);
    this.partenaireAdd.societe = this.reactiveForm.value.societe1;
    this.partenaireAdd.Fax = this.reactiveForm.value.Fax1;
    this.partenaireAdd.codePostal = this.reactiveForm.value.codePostal1;
    this.partenaireAdd.mail = this.reactiveForm.value.mail1;
    this.partenaireAdd.mdp = this.reactiveForm.value.mdp1;
    this.partenaireAdd.tel = this.reactiveForm.value.tel1;
    this.service.postFile(this.fileAdd).subscribe(res => {
      this.partenaireAdd.img = res.data;
      this.service.AddPartenaire(this.partenaireAdd).subscribe(res => {
          this.id_part=res.data[0].id_part;
          console.log('ajouté');
          
          Swal.fire({
            icon: 'success',
            title: 'Partenaire ajouté avec succés',
            showConfirmButton: false,
            timer: 1500
          })
       
       
      },
      error => {
        Swal.fire('invalide', 'Email déja existe', 'error');
    
      })
    })
  }
}
