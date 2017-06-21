import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Http, Response } from '@angular/http';

import { HttpRegionService } from '../services/http-region.service'
import { HttpPlaceService } from '../services/http-place.service'
import { AuthService } from '../services/auth.service'

import { Region } from '../model/region.model';
import { Place } from '../model/place.model';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
   providers: [HttpRegionService, HttpPlaceService, AuthService]
})
export class RegionComponent implements OnInit {
  regions: Region[];
  places: Place[];
  error: any;

  constructor(private httpRegionService: HttpRegionService,
   private httpPlaceService: HttpPlaceService,
   private authService: AuthService) {
  }

  ngOnInit() {
    this.httpRegionService.getRegions().then(regions => this.regions = regions).catch(error => this.error = error);
    this.httpPlaceService.getPlaces().then(places => this.places = places).catch(error => this.error = error);
  }

  onSubmit(region: Region, form: NgForm) {
    console.log(region);
    this.httpRegionService.postRegion(region);
    form.reset();
  }

  delete(buttonId: any){
    console.log("Usao sam u delete regions" + buttonId);
    //this.httpAccommodationService.postAccommodationApproval(buttonId);
    this.httpRegionService.delete(buttonId);
  }

  isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  getUserRole(): any{
    return this.authService.getUserRole();
  }


}
