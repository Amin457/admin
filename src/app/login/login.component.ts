import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isTypePassword=true;
  constructor(private router: Router ,private userService : UserService) {
    this.initForm();

   }

   initForm() {
    this.form = new FormGroup({
      mail: new FormControl('',
        {validators: [Validators.required, Validators.email]}
      ),
      mdp: new FormControl('',
        {validators: [Validators.required, Validators.minLength(8)]}
      ),
    });
  }
  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
    }
    this.userService.login(this.form.value).subscribe(
      (res)  => {
       if(res.unauthorised===true){
        return false;
      }else{
        localStorage.setItem('token',res.token);
        this.router.navigate(['home/dashboard']);

        return false;
      }
      },
      error => {
        Swal.fire('error', 'email ou mot de passe non valide !! ', 'error');
      });
    }
  ngOnInit(): void {
  }

}
