import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Room } from '../model/room.model';
// import { Accommodation } from '../model/accommodation.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpRoomService{
       headers: Headers;

    constructor (private http: Http){
        this.headers = new Headers();
        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = this.headers;
    } 

    postRoom(room: any): Promise<any> {
        return this.http
            .post('http://localhost:54042/api/Rooms', 
            JSON.stringify({
                RoomNumber: room.RoomNumber,
                BedCount: room.BedCount,
                Description: room.Description,
                PricePerNight: room.PricePerNight,
                    
                Accomodation: {
                    Id: room.Accomodation,
                }
        }),
             {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Room)
            .catch(this.handleError);
    }   

     private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}