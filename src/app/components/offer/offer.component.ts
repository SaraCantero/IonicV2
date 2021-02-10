import { Component, Input, OnInit } from '@angular/core';
import { OffersData } from 'src/app/interfaces/offers';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  @Input() offer: OffersData;
  @Input() i: number;
  
  constructor() { }

  ngOnInit() {}

}
