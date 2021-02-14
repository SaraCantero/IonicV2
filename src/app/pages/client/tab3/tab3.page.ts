import { Component } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { OffersData } from 'src/app/interfaces/offers';
import { Tab2Page } from '../tab2/tab2.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  offersApliques: OffersData[]=[];
  images=[];
  contador=0;
  contador2=0;
  cicles:any;

  constructor(public restService: RestService) {

    this.obtenerCicloIds();
    this.obtenerOfertasApliques();
    setTimeout(() => {
      this.offerYimg();
    },1000);
  }

  obtenerOfertasApliques(){

    this.restService.getApliquesOffers()
    .then((res: any) => {
      this.offersApliques=res.data;
      console.log(this.offersApliques);
    },
    );
  }

  abrirModalApliques($image:any, $id2: any, $titulo2: any, $descripcion2: any, $ciclo2: any, 
    $fecha2: any, $cand2: any){
    this.restService.abrirModal($image, $id2, $titulo2, $descripcion2, $ciclo2, $fecha2, $cand2);
  }

  offerYimg(){
    console.log("ENTRO FOTOS");
    this.contador=0;
    this.images=[];
    console.log("OFFERS:")
    console.log(this.offersApliques);
    console.log("CICLES:");
    console.log(this.cicles);
    this.offersApliques.forEach((f: {cicle_id: number}) => {
      console.log("FOREACH");
      this.cicles.forEach((c: {id: number, img: any}) => {
        console.log("FOREACHDOBLE");
        if(f.cicle_id==c.id){
          this.images[this.contador]=c.img;
          this.contador=this.contador+1;
        }
      })
    })
    console.log("HEY");
    console.log(this.images);
    console.log("HEY");
    this.restService.setImagesOffers(this.images);
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

  refrescar(){
    this.obtenerCicloIds();
    this.obtenerOfertasApliques();
    setTimeout(() => {
      this.offerYimg();
    },1000);
  }
}