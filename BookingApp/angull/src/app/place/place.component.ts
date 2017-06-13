import { Component, OnInit } from '@angular/core';
import {HttpPlaceService} from '../services/http-place.service'

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  providers: [HttpPlaceService]
})
export class PlaceComponent implements OnInit {


  constructor() {
  }

  ngOnInit() {
  }

}
