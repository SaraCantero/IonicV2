import { Component, Input, OnInit } from '@angular/core';
import { OffersData } from 'src/app/interfaces/offers';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  @Input() offers: OffersData[] = [];
  
  constructor() { }

  ngOnInit() {}

}
