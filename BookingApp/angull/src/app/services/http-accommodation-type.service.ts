import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AccommodationType } from '../model/accommodation-type.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpAccommodationTypeService{

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor (private http: Http){

    }

     getAccommodationTypes(): Promise<AccommodationType[]> {
        return this.http.get("http://localhost:54042/api/AccommodationTypes")
                    .toPromise()
                    .then(response => response.json() as AccommodationType[])
                    .catch(this.handleError);
     }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    
    postAccommodationType(country: any): Promise<any> {
        return this.http
            .post('http://localhost:54042/api/AccommodationTypes', 
            JSON.stringify({
                  Name: country.Name
                
        }),
             {headers: this.headers})
            .toPromise()
            .then(res => res.json() as AccommodationType)
            .catch(this.handleError);
    }   

    delete(id: number): Promise<void> {
        const url = `${"http://localhost:54042/api/AccommodationTypes"}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError); 
  }
}