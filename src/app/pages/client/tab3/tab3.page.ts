import { Component } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { OffersData } from 'src/app/interfaces/offers';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  offersApliques: OffersData[]=[];

  constructor(public restService: RestService) {

    this.obtenerOfertasApliques();
  }

  obtenerOfertasApliques(){

    this.restService.getApliquesOffers()
    .then((res: any) => {
      this.offersApliques=res.data;
      console.log(this.offersApliques);
    },
    );
  }
  
}