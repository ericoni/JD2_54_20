import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Http, Response } from '@angular/http';

import { HttpAccommodationTypeService } from '../services/http-accommodation-type.service'
import { AccommodationType } from '../model/accommodation-type.model';

@Component({
  selector: 'app-accommodationType',
  templateUrl: './accommodationType.component.html',
  providers: [HttpAccommodationTypeService]
})
export class AccommodationTypeComponent implements OnInit {
  accommodationTypes: AccommodationType[];
  error: any;


  constructor(private httpAccommodationTypeService: HttpAccommodationTypeService) {
  }

  ngOnInit() {
    this.httpAccommodationTypeService.getAccommodationTypes().then(accommodationTypes => this.accommodationTypes = accommodationTypes).catch(error => this.error = error);
  }

  onSubmit(accommodationType: AccommodationType, form: NgForm) {
    console.log(accommodationType);
    this.httpAccommodationTypeService.postAccommodationType(accommodationType);
    form.reset();
  }

  delete(buttonId: any){
    console.log("Usao sam u delete countries" + buttonId);
    this.httpAccommodationTypeService.delete(buttonId);
  }
}
