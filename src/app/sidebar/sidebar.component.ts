import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  clicked=false;

  constructor() { }

  ngOnInit(): void {
  }

 
  public openNav(){
    this.clicked=!this.clicked;
  }
  

}
