import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Http, Response } from '@angular/http';

import { HttpPlaceService } from '../services/http-place.service';
import { HttpRegionService } from '../services/http-region.service'
import { Place } from '../model/place.model';
import { Region } from '../model/region.model';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  providers: [HttpPlaceService, HttpRegionService]
})

export class PlaceComponent implements OnInit {
  places: Place[];
  regions: Region[];
  error: any;
  place: Place;

  constructor(private httpPlaceService: HttpPlaceService, private httpRegionService: HttpRegionService) {
    this.place = new Place(100, "Plejsic", 3000, null, null);
  }

  ngOnInit() {
       this.httpRegionService.getRegions().then(regions => this.regions = regions).catch(error => this.error = error);
       this.httpPlaceService.getPlaces().then(places => this.places = places).catch(error => this.error = error);
  }

   onSubmit(place: Place, form: NgForm) {
    console.log(place);
    this.httpPlaceService.postPlace(place);
    form.reset();
  }

  delete(buttonId: any){
    console.log("Usao sam u delete places" + buttonId);
    this.httpPlaceService.delete(buttonId);
  }

   update(buttonId: any, place: any){
   // console.log("Usao sam u update places" + buttonId);
    this.httpPlaceService.update(buttonId, place);
    
    //this.httpPlaceService.delete(buttonId);
  }

}
