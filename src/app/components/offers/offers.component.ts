import { Component, Input, OnInit } from '@angular/core';
import { OffersData } from 'src/app/interfaces/offers';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {

  tipo: any;
  mostrarAplicar: boolean;
  @Input() offers: OffersData[] = [];
  
  constructor(public restService: RestService) {
    this.tipo=restService.getType();
    if(this.tipo=="client"){
      this.mostrarAplicar=true;
    }else{
      this.mostrarAplicar=false;
    }
  }

  recogerId($dato: any){
    console.log("Id_oferta: "+$dato);
    console.log("UserId: "+this.restService.getUserId());
    this.restService.setOfertaId($dato);
    this.restService.postApliqueOffer(this.restService.getUserId(),$dato);
  }

  abrirModalOffers($id1: any, $titulo1: any, $descripcion1: any, $ciclo1: any, $fecha1: any, $cand1: any){
    this.restService.abrirModal($id1, $titulo1, $descripcion1, $ciclo1, $fecha1, $cand1);
  }

  ngOnInit() {}

}
