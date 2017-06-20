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

 onSubmit(roomResParameter: any, form: NgForm) {
    //console.log(roomResParameter);

    //this.httpRoomReservationService.postRoomReservation(roomResParameter); // nije uradjeno vrati se
    this.reservation.StartDate.setDate(roomResParameter.startDate);
    this.reservation.StartDate.setMonth(roomResParameter.startMonth);
    this.reservation.StartDate.setFullYear(roomResParameter.startYear);

    this.reservation.EndDate.setDate(roomResParameter.endData);
    this.reservation.EndDate.setMonth(roomResParameter.endMonth);
    this.reservation.EndDate.setFullYear(roomResParameter.endYear);
    this.reservation.Room = new Room();
    this.reservation.Room.Id = roomResParameter.Room;
    this.reservation.TimeStamp = new Date();
    this.reservation.AppUser = new User();
    // this.reservation.user.id = 1;
    console.log("cakija"); 
    console.log(this.reservation);
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
