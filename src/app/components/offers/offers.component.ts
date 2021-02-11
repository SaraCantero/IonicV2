import { Component, Input, OnInit } from '@angular/core';
import { OffersData } from 'src/app/interfaces/offers';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {

  @Input() offers: OffersData[] = [];
  
  constructor(public restService: RestService) { }

  recogerId($dato: any){
    console.log("Id_oferta: "+$dato);
    console.log("UserId: "+this.restService.getUserId());
    this.restService.setOfertaId($dato);
    this.restService.postApliqueOffer(this.restService.getUserId(),$dato);
  }

  ngOnInit() {}

}
