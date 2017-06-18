import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Room } from '../model/room.model';
// import { Accommodation } from '../model/accommodation.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpRoomService{
    private headers = new Headers({'Content-Type': 'application/json'});
    //    headers: Headers;

    constructor (private http: Http){
        // this.headers = new Headers();
        // this.headers.append('Accept', 'application/json');
        // this.headers.append('Content-type', 'application/json');

        // const opts: RequestOptions = new RequestOptions();
        // opts.headers = this.headers;
    } 

    postRoom(room: any): Promise<any> {
        return this.http
            .post('http://localhost:54042/api/Room', 
            JSON.stringify({
                RoomNumber: room.RoomNumber,
                BedCount: room.BedCount,
                Description: room.Description,
                PricePerNight: room.PricePerNight,
                    
                Accomodation: {
                    Id: room.Accommodation,
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

    getRooms(): Promise<Room[]> {
        return this.http.get("http://localhost:54042/api/Room")
                    .toPromise()
                    .then(response => response.json() as Room[])
                    .catch(this.handleError);
     }

     delete(id: number): Promise<void> {
        const url = `${"http://localhost:54042/api/Room"}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError); // treba rijesiti kaskadno brisanje
  }

}