import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Http, Response } from '@angular/http';

import { HttpAccommodationService } from '../services/http-accommodation.service'
import { HttpRoomService } from '../services/http-room.service' 

import { Accommodation } from '../model/accommodation.model'

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  providers: [HttpRoomService, HttpAccommodationService]
})
export class RoomComponent implements OnInit {
  accommodations: Accommodation[];
  error: any;

  constructor(private httpRoomService: HttpRoomService, private httpAccommodationService: HttpAccommodationService) {
  }

  ngOnInit() {
      this.httpAccommodationService.getAccommodations().then(accommodations => this.accommodations = accommodations).catch(error => this.error = error);
  }

  onSubmit(room: any, form: NgForm) {
    console.log(room);
    debugger
    this.httpRoomService.postRoom(room);
   //this.httpAccommodationService.postAccommodation(accomodation).subscribe(this.onPost);
    form.reset();
  }

}
