import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../services/rest.service';

@Component({
  selector: 'app-admin4',
  templateUrl: './admin4.page.html',
  styleUrls: ['./admin4.page.scss'],
})
export class Admin4Page implements OnInit {

  constructor(public restService: RestService,) { }

  ngOnInit() {
  }

}
