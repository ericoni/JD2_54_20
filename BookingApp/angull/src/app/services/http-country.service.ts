import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Country } from '../model/country.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpCountryService{

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor (private http: Http){

    }

    getCountries(): Promise<Country[]> {
        return this.http.get("http://localhost:54042/api/countries")
                    .toPromise()
                    .then(response => response.json() as Country[])
                    .catch(this.handleError);
     }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    
 postCountry(country: any): Promise<any> {
        return this.http
            .post('http://localhost:54042/api/countries', 
            JSON.stringify({
                  Name: country.Name,
                  Code: country.Code
                
        }),
             {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Country)
            .catch(this.handleError);
    }   

    delete(id: number): Promise<void> {
        const url = `${"http://localhost:54042/api/countries"}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError); 
  }

}