import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Region } from '../model/region.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpRegionService{

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor (private http: Http){
      
    }

    postRegion(region: any): Promise<any> {
        return this.http
            .post('http://localhost:54042/api/Regions', 
            JSON.stringify({
                Name: region.Name,    
                Country: {
                    Name: region.Country
                }         
        }),
          //   JSON.stringify(region),
             {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Region)
            .catch(this.handleError);
    }   

      getRegions(): Promise<Region[]> {
        return this.http.get("http://localhost:54042/api/Regions")
                    .toPromise()
                    .then(response => response.json() as Region[])
                    .catch(this.handleError);
     }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    delete(id: number): Promise<void> {
        const url = `${"http://localhost:54042/api/Regions"}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError); 
  }

}