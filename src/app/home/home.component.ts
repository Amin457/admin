import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  clicked=false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

 
  public openNav(){
    this.clicked=!this.clicked;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }
}
