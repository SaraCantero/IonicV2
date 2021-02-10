import { Component } from '@angular/core';
import { RestService } from '../../../services/rest.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  //token: any;
  offers: any;
  cicles: any;
  df=0;
  ofId: any;
  contador=0;
  contador2=0;
  clIDs = [];

  constructor(public restService: RestService) {
    //this.hacerLogin();
    this.obtenerOfertas();
    //this.obtenerCicloIds();
  }

  // hacerLogin(){
  //   this.restService.login('raulreyes@gmail.com','123456').then(data => {
  //     console.log('Token: ', data);
  //     this.token = data;
  //   });
  // }

  obtenerOfertas(){
    this.restService.getOffers()
    .then((res: any) => {
      this.offers=res.data;
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

  mostrar(){
    console.log("{{offer.id}}");
  }
}