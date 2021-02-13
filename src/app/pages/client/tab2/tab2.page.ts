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
  contador3=0;
  clIDs = [];
  clIDs2 = [];

  constructor(public restService: RestService) {
    //this.hacerLogin();
    this.obtenerCicloIds();
    this.obtenerOfertas();
    this.offerYimg();
  }
  obtenerOfertas(){
    this.restService.getOffers()
    .then((res: any) => {
      this.offers=res.data;
      console.log("OFERTAS");
      console.log(this.offers);
      console.log("0");
      console.log(this.cicles);
      if(this.df>0){
        this.contador=0;
        this.clIDs=[];
        this.offers.forEach((id: { cicle_id: number; }) => {
          if(id.cicle_id==this.df){
            console.log(id);
            this.clIDs[this.contador]=id;
            this.contador = this.contador+1;
          }
        });
        this.offers = this.clIDs;
        console.log("OFERTA FINAL");
        console.log(this.offers);
        console.log("OFERTA FINAL");
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

  offerYimg(){
    this.contador3=0;
    this.clIDs2=[];
    this.offers.forEach((f: {cicle_id: number}) => {
      this.cicles.forEach((c: {id: number, img: any}) => {
        console.log("HOLA CAPULLO");
        if(f.cicle_id==c.id){
          this.clIDs2[this.contador3]=c.img+f;
          this.contador3=this.contador3+1;
        }
      })
    })
    console.log("HEY");
    console.log(this.clIDs2);
  }
}