import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { dashbord } from '../model/Admin';
import { dateStat } from '../model/dateStat';
import { DashbordService } from '../services/dashbord.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashbord :dashbord=new dashbord();
  dateDebut!: any;
  dateFin!: any;
  myDate = new Date();
  dateDebut1: any=this.date();
  dateFin1: any= new DatePipe('en-US').transform(this.myDate, 'yyyy-MM-dd');
  dateStat:dateStat=new dateStat();
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'patenaire' },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: false,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  lineChartColors1: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,255,0,0.28)',
    },
  ];
  lineChartData1: ChartDataSets[] = [
    { data: [], label: 'clients' },
  ];

  lineChartLabels1: Label[] = [];


  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'nombre de carte par partenaire' }
  ];
  constructor(private service:DashbordService) { 
    this.onGenerate();
    this.statCarte();
  }

  ngOnInit(): void {
    this.service.statDashbord().subscribe(res => {
     this.dashbord.nbrClient=res.data[0].nbrClient;
     this.dashbord.nbrPart=res.data1[0].nbrPart;
     this.dashbord.nbrPartenariat=res.data2[0].nbrPartenariat
   })

   console.log("hhhh", this.dashbord);
  }
  onGenerate(){
    this.dateDebut = new DatePipe('en-US').transform(this.dateDebut1, 'yyyy-MM-dd');
    this.dateFin = new DatePipe('en-US').transform(this.dateFin1, 'yyyy-MM-dd');
    this.dateStat.dateDebut=this.dateDebut;
    this.dateStat.dateFin=this.dateFin;
    this.service.statPartenaires(this.dateStat).subscribe(res => {
      this.lineChartLabels=[];
      this.lineChartData[0].data=[];
      console.log(res.data);
       
      for (var index in res.data) {
 
         this.lineChartLabels.push(res.data[index].month+res.data[index].year);
         this.lineChartData[0].data?.push(res.data[index].nbrTotal);  
    
       }
      
    })


    this.service.statUser(this.dateStat).subscribe(res => {
      this.lineChartLabels1=[];
      this.lineChartData1[0].data=[];
      console.log(res.data);
       
      for (var index in res.data) {
 
         this.lineChartLabels1.push(res.data[index].month+res.data[index].year);
         this.lineChartData1[0].data?.push(res.data[index].nbrTotal);  
    
       }
      
    })
  }
 
statCarte(){
  this.service.statCarte().subscribe(res => {
    console.log(res.data)
   for (var index in res.data) {

      this.barChartLabels.push(res.data[index].societe);
      this.barChartData[0].data?.push(res.data[index].nbr);  
 
    }
   
 })
}

  date() {
    let date: Date = new Date();
    date.setDate(date.getDate() -730);
    let datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

}

