import { Component, OnInit } from '@angular/core';
import { HttpPlaceService } from '../services/http-place.service'
import { Place } from '../model/place.model';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  providers: [HttpPlaceService]
})
export class PlaceComponent implements OnInit {
  places: Place[];

  constructor(private httpPlaceService: HttpPlaceService) {
  }

  ngOnInit() {
     this.httpPlaceService.getProducts().subscribe(
      (pl: any) => {this.places = pl; console.log(this.places)},//You can set the type to Product.
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

}
