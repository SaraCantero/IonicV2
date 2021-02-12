import { Component } from '@angular/core';
import { OffersData } from 'src/app/interfaces/offers';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-admin3',
  templateUrl: './admin3.page.html',
  styleUrls: ['./admin3.page.scss'],
})
export class Admin3Page {

  offers: OffersData[]=[];

  constructor(public restService: RestService) { 
    this.obtenerOfertas2();
  }

  obtenerOfertas2(){
    this.restService.getAllOffers()
    .then((res: any) => {
      this.offers=res.data;
      console.log("OFERTAS");
      console.log(this.offers);
    }
    )
  }

  eliminar(id: any){
    this.restService.borrarOfertas(id);
  }

}
