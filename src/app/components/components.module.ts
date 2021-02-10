import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticlesComponent} from './articles/articles.component';
import {ArticleComponent} from './article/article.component';
import { IonicModule } from '@ionic/angular';
import { OfferComponent } from './offer/offer.component';
import { OffersComponent } from './offers/offers.component';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticlesComponent,
    OfferComponent,
    OffersComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ArticlesComponent,
    OffersComponent
   ]

})
export class ComponentsModule { }
