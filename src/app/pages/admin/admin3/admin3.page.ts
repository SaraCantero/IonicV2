import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { OffersData } from 'src/app/interfaces/offers';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-admin3',
  templateUrl: './admin3.page.html',
  styleUrls: ['./admin3.page.scss'],
})
export class Admin3Page {

  offers: OffersData[]=[];

  constructor(public restService: RestService, private actionSheetCtrl: ActionSheetController) { 
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

  async confirmar(nombre: any, id: any){
    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Seguro que quieres borrar '+nombre+'?',
      buttons: [{
      text: 'Borrar',
      role: 'destructive', // Este role hace que, en Iphone, aparezca en rojo
      icon: 'trash',
      handler: () => {
      this.eliminar(id);
      console.log('Delete clicked');
      this.obtenerOfertas2();
      }
      }, {
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel', // Este role hace que si pinchamos fuera se ejecute
      handler: () => {
      console.log('Cancel clicked');
      }
      }]
      });
      await actionSheet.present();
  }

  eliminar(id: any){
    this.restService.borrarOfertas(id);
  }

}
