import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ClientComponent } from './client/client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemandeComponent } from './demande/demande.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PartenaireComponent } from './partenaire/partenaire.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  { path: 'home', component: HomeComponent ,
  children:[
    { path: 'partenaires', component: PartenaireComponent },
    { path: 'clients', component: ClientComponent },
    { path: 'demande', component: DemandeComponent },
    { path: 'dashboard', component: DashboardComponent },
  
  ],canActivate:[AuthGuard]
  
},
{ path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
