import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OffersData } from 'src/app/interfaces/offers';
import { RestService } from 'src/app/services/rest.service';
import { OfferComponent } from '../offer/offer.component';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {

  @Input() offers: OffersData[] = [];
  
  constructor(public restService: RestService, private modalCtrl: ModalController) { }

  recogerId($dato: any){
    console.log("Id_oferta: "+$dato);
    console.log("UserId: "+this.restService.getUserId());
    this.restService.setOfertaId($dato);
    this.restService.postApliqueOffer(this.restService.getUserId(),$dato);
  }

  async abrirModal(){
    const modal = await this.modalCtrl.create({
      component: OfferComponent,
      componentProps: {
      headline: 'Raúl',
      }
      });
      await modal.present();
  }
  
  ngOnInit() {}

}
