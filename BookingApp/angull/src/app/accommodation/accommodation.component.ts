import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Http, Response } from '@angular/http';

import { HttpAccommodationService } from '../services/http-accommodation.service'
import { HttpPlaceService } from '../services/http-place.service'
import { HttpAccommodationTypeService } from '../services/http-accommodation-type.service' 

import { Place } from '../model/place.model';
import { User } from '../model/user.model';
import { AccommodationType } from '../model/accommodation-type.model'

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  providers: [HttpAccommodationService, HttpPlaceService, HttpAccommodationTypeService]
})
export class AccommodationComponent implements OnInit {
  places: Place[];
  users: User[];
  accommodationTypes: AccommodationType[];
  
  constructor(private httpAccommodationService: HttpAccommodationService, 
  private httpPlaceService: HttpPlaceService, private httpAccommodationTypeService: HttpAccommodationTypeService) {
  }

  ngOnInit() {
  this.httpPlaceService.getPlaces().subscribe(
      (r: any) => {this.places = r; console.log(this.places)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
 
    this.httpAccommodationTypeService.getAccommodationTypes().subscribe(
      (ap: any) => {this.accommodationTypes = ap; console.log(this.accommodationTypes)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

 onSubmit(accomodation: any, form: NgForm) {
    console.log(accomodation);
    this.httpAccommodationService.postAccommodation(accomodation).subscribe(this.onPost);
    form.reset();
  }

  onPost(res : any) : void{
    alert("Post!");
    console.log(res.json());
  }
 


}
