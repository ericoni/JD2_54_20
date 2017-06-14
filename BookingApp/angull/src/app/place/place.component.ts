import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Http, Response } from '@angular/http';

import { HttpPlaceService } from '../services/http-place.service'
import { Place } from '../model/place.model';
import { Region } from '../model/region.model';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  providers: [HttpPlaceService]
})
export class PlaceComponent implements OnInit {
  places: Place[];
  regions: Region[];

  constructor(private httpPlaceService: HttpPlaceService) {
  }

  ngOnInit() {
     this.httpPlaceService.getRegions().subscribe(
      (r: any) => {this.regions = r; console.log(this.regions)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

   onSubmit(place: Place, form: NgForm) {
    console.log(place);
    this.httpPlaceService.postPlace(place).subscribe(this.onPost);
    form.reset();
  }

  onPost(res : any) : void{
    alert("Post!");
    console.log(res.json());
  }

}
