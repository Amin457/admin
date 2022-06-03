import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { DemandePart } from '../model/partenaire-model';
import { DemandeService } from '../services/demande.service';

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


  constructor(private service: DemandeService) { }

  ngOnInit(): void {

    this.service.getDemandes().subscribe(res => {
      this.listDemandes = res.data;
      console.log(this.listDemandes);
    })
  }

  ngAfterViewInit(): void {
    this.elm = this.myModal.nativeElement as HTMLElement;
    this.service.getDemandes().subscribe(res => {
      this.listDemandes = res.data;
      console.log(this.listDemandes);
    })
  }
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

  approuved(id_part: number,societe:string) {

    
    this.service.Approuved(id_part).subscribe(res => {
      Swal.fire('Félicitation ', societe+' est notre nouveau partenaire' , 'success');
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
