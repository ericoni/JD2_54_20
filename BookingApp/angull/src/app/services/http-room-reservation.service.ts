import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { RoomReservation } from '../model/room-reservation.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpRoomReservationService{

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor (private http: Http){

    }

    getRoomReservations(): Promise<RoomReservation[]> {
        return this.http.get("http://localhost:54042/api/RoomReservations")
                    .toPromise()
                    .then(response => response.json() as RoomReservation[])
                    .catch(this.handleError);
     }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    
 postRoomReservation(roomReservation: RoomReservation): Promise<any> {
        return this.http
            .post('http://localhost:54042/api/RoomReservations', 
            //JSON.stringify(roomReservation),
            JSON.stringify({
                        StartDate: roomReservation.StartDate,
                        EndDate: roomReservation.EndDate,
                        TimeStamp: roomReservation.TimeStamp,
                        User:{
                            Username: roomReservation.User.Username
                        },
                        Room: {
                            Id: roomReservation.Room.Id,
                            Accomodation: {
                   
                                UserOwner: {


                                },
                                Place: {
                                    Region: {
                                        Country: {

                                        }
                                    }            
                                },
                                AccomodationType: {

                                }
                             }

                        }
                
        }),
             {headers: this.headers}) 
            .toPromise()
            .then(res => res.json() as RoomReservation)
            .catch(this.handleError);
    }   

    delete(id: number): Promise<void> {
        const url = `${"http://localhost:54042/api/RoomReservations"}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError); 
  }

}