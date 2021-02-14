import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticlesComponent} from './articles/articles.component';
import {ArticleComponent} from './article/article.component';
import { IonicModule } from '@ionic/angular';
import { OfferComponent } from './offer/offer.component';
import { OffersComponent } from './offers/offers.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticlesComponent,
    OfferComponent,
    OffersComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ArticlesComponent,
    OffersComponent,
    HeaderComponent
   ]

})
export class ComponentsModule { }
