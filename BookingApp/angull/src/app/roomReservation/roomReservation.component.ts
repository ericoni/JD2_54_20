import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Http, Response } from '@angular/http';

import { Room } from '../model/room.model';
import { User } from '../model/user.model';
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
  reservation: RoomReservation;
  error: any;

  constructor( private httpRoomService: HttpRoomService,
  private httpRoomReservationService: HttpRoomReservationService,
  private authService: AuthService) {
    this.reservation = new RoomReservation();
    this.reservation.StartDate = new Date();
    this.reservation.EndDate = new Date();
  
  }

  ngOnInit() {
    this.httpRoomService.getRooms().then(rooms => this.rooms = rooms).catch(error => this.error = error);
    this.httpRoomReservationService.getRoomReservations().then(roomReservations => this.roomReservations = roomReservations).catch(error => this.error = error);
    this.reservation = new RoomReservation();
    this.reservation.StartDate = new Date();
    this.reservation.EndDate = new Date();
  }

 onSubmit(roomResParameter: RoomReservation, form: NgForm) {
    this.reservation.StartDate = roomResParameter.StartDate;
    this.reservation.EndDate = roomResParameter.EndDate;
    this.reservation.Room = new Room();
    this.reservation.Room.Id =  Number.parseInt((<HTMLInputElement>document.getElementById("rumic")).value);
    this.reservation.User = new User();

    let user = JSON.parse(localStorage.getItem("currentUser"));


    this.reservation.User.Username = user.username;
    debugger
    this.httpRoomReservationService.postRoomReservation(this.reservation); 
    form.reset();
  }

  delete(buttonId: any){
    console.log("Usao sam u delete roomRes" + buttonId);
    this.httpRoomReservationService.delete(buttonId);
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
