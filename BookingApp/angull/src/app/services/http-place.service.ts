import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Place } from '../model/place.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpPlaceService{

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor (private http: Http){

    }

    getPlaces(): Promise<Place[]> {
        return this.http.get("http://localhost:54042/api/places")
                    .toPromise()
                    .then(response => response.json() as Place[])
                    .catch(this.handleError);
     }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    
 postPlace(place: any): Promise<any> {
        return this.http
            .post('http://localhost:54042/api/Places', 
            JSON.stringify({
                  Name: place.Name,
            Region: {
                Id: place.Region,
                Country : 
                {

                }
            }
                
        }),
             {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Place)
            .catch(this.handleError);
    }   

    delete(id: number): Promise<void> {
        const url = `${"http://localhost:54042/api/Places"}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError); 
  }

}