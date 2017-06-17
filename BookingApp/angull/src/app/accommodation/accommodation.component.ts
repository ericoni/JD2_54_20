import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Http, Response } from '@angular/http';

import { HttpAccommodationService } from '../services/http-accommodation.service'
import { HttpPlaceService } from '../services/http-place.service'
import { HttpAccommodationTypeService } from '../services/http-accommodation-type.service' 

import { Place } from '../model/place.model';
import { User } from '../model/user.model';
import { AccommodationType } from '../model/accommodation-type.model';
import { Accommodation } from '../model/accommodation.model';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  providers: [HttpAccommodationService, HttpPlaceService, HttpAccommodationTypeService]
})
export class AccommodationComponent implements OnInit {
  places: Place[];
  users: User[];
  accommodationTypes: AccommodationType[];
  unapprovedAccommodations: Accommodation[];
  error: any;
  
  constructor(private httpAccommodationService: HttpAccommodationService, 
  private httpPlaceService: HttpPlaceService, private httpAccommodationTypeService: HttpAccommodationTypeService) {
  }

  ngOnInit() {
  // this.httpPlaceService.getPlaces().subscribe(
  //     (r: any) => {this.places = r; console.log(this.places)},
  //     error => {alert("Unsuccessful fetch operation!"); console.log(error);}
  //   );
 
    // this.httpAccommodationTypeService.getAccommodationTypes().subscribe(
    //   (ap: any) => {this.accommodationTypes = ap; console.log(this.accommodationTypes)},
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );
    this.httpAccommodationTypeService.getAccommodationTypes().then(accommodationTypes => this.accommodationTypes = accommodationTypes).catch(error => this.error = error);
    this.httpPlaceService.getPlaces().then(places => this.places = places).catch(error => this.error = error);
    this.httpAccommodationService.getUnapprovedAccommodations().then(unapprovedAccommodations => this.unapprovedAccommodations = unapprovedAccommodations).catch(error => this.error = error);
}

 onSubmit(accommodation: any, form: NgForm) {
    console.log(accommodation);
    this.httpAccommodationService.postAccommodation(accommodation);
   //this.httpAccommodationService.postAccommodation(accomodation).subscribe(this.onPost);
    form.reset();
  }

  onPost(res : any) : void{
    alert("Post!");
    console.log(res.json());
  }

  // onSubmit2(accommodation: any, form: NgForm) {
  //   console.log(accommodation);
  //   debugger
  //   this.httpAccommodationService.postAccommodation(accommodation);
  //  //this.httpAccommodationService.postAccommodation(accomodation).subscribe(this.onPost);
  //   form.reset();
  // }

  approve(buttonId: any){
    console.log("Usao sam" + buttonId);
    this.httpAccommodationService.postAccommodationApproval(buttonId);
  }

 
}
