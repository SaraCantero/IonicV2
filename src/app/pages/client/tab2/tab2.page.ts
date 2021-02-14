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
  images = [];

  constructor(public restService: RestService) {
      this.obtenerOfertas();
      this.obtenerCicloIds();
      setTimeout(() => {
        this.offerYimg();
      },1000);
  }
  obtenerOfertas(){
    console.log("ENTRO OFERTAS");
    this.restService.getOffers()
    .then((res: any) => {
      this.offers=res.data;      
      console.log("OFERTAS");
      console.log(this.offers);
      console.log("CICLOS EN OFERTAS")
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
    console.log("ENTRO CICLOS");
    this.contador2=0;
    this.restService.getCicles()
    .then((res: any) => {
      console.log("OBTENGO CICLOS");
      this.cicles=res.data;
      console.log(this.cicles);
    })
  }

  offerYimg(){
    console.log("ENTRO FOTOS");
    this.contador3=0;
    this.images=[];
    console.log("OFFERS:")
    console.log(this.offers);
    console.log("CICLES:");
    console.log(this.cicles);
    this.offers.forEach((f: {cicle_id: number}) => {
      console.log("FOREACH");
      this.cicles.forEach((c: {id: number, img: any}) => {
        console.log("FOREACHDOBLE");
        if(f.cicle_id==c.id){
          this.images[this.contador3]=c.img;
          this.contador3=this.contador3+1;
        }
      })
    })
    console.log("HEY");
    console.log(this.images);
    console.log("HEY");
    this.restService.setImagesOffers(this.images);
  }

  refrescar(){
    this.obtenerOfertas();
    this.obtenerCicloIds();
    setTimeout(() => {
      this.offerYimg();
    },1000);
  }
}