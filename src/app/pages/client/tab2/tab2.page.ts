import { Component } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { OffersData } from 'src/app/interfaces/offers';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  //token: any;
  offers: OffersData[]=[];
  cicles: any;
  apliques: any;
  df=0;
  ofId: any;
  contador=0;
  contador2=0;
  clIDs = [];

  constructor(public restService: RestService) {
    //this.hacerLogin();
    this.obtenerOfertas();
    this.obtenerCicloIds();
  }

  //Usar esto para quitar ofertas del apliques

  obtenerOfertas(){
    this.restService.getOffers()
    .then((res: any) => {
      this.offers=res.data;
      console.log("OFERTAS");
      console.log(this.offers);
      if(this.df>0){
        this.contador=0;
        this.clIDs=[];
        this.offers.forEach((id: { cicle_id: number; }) => {
          console.log("FOREACH");
          if(id.cicle_id==this.df){
            console.log(id);
            this.clIDs[this.contador]=id;
            this.contador = this.contador+1;
          }
        });
        this.offers = this.clIDs;
      }
    },
    );
  }

  onChange($dato: number){
    this.df=$dato;
    console.log("Filtro: "+this.df);

    this.obtenerOfertas();
  }

  obtenerCicloIds(){
    this.contador2=0;
    this.restService.getCicles()
    .then((res: any) => {
      this.cicles=res.data;
      console.log(this.cicles);
    })
  }


}