import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { PartenaireComponent } from './partenaire/partenaire.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientComponent } from './client/client.component';
import { LoginComponent } from './login/login.component';
import { DemandeComponent } from './demande/demande.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { PartenairePipe } from './pipes/partenaire.pipe';
import { UserPipe } from './pipes/user.pipe';
import { AddpartComponent } from './partenaire/addpart/addpart.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    PartenaireComponent,
    ClientComponent,
    LoginComponent,
    DemandeComponent,
    DashboardComponent,
    PartenairePipe,
    UserPipe,
    AddpartComponent,
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
