import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Http, Response } from '@angular/http';

import { Room } from '../model/room.model';
import { RoomReservation } from '../model/room-reservation.model';

import { HttpRoomService } from '../services/http-room.service';
import { HttpRoomReservationService } from '../services/http-room-reservation.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-roomReservation',
  templateUrl: './roomReservation.component.html',
  providers: [HttpRoomService, AuthService, HttpRoomReservationService]
})
export class RoomReservationComponent implements OnInit {
  rooms: Room[];
  roomReservations: RoomReservation[];
  error: any;

  constructor( private httpRoomService: HttpRoomService,
  private httpRoomReservationService: HttpRoomReservationService,
  private authService: AuthService) {
  }

  ngOnInit() {
    this.httpRoomService.getRooms().then(rooms => this.rooms = rooms).catch(error => this.error = error);
    this.httpRoomReservationService.getRoomReservations().then(roomReservations => this.roomReservations = roomReservations).catch(error => this.error = error);
    console.log(this.rooms);
  }

 onSubmit(roomRes: any, form: NgForm) {
  let a = this.rooms[0];
  debugger
    console.log(roomRes);
    this.httpRoomReservationService.postRoomReservation(roomRes); // nije uradjeno
    form.reset();
  }

  isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  getUserRole(): any{
    return this.authService.getUserRole();
  }

  logout(): void {
     this.authService.logout();
  }
}
