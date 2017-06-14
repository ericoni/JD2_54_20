import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Place } from '../model/place.model';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpPlaceService{

    constructor (private http: Http){

    }

    getPlaces(): Observable<any> {

        return this.http.get("http://localhost:54042/api/places").map(this.extractData);        
    }

    getRegions(): Observable<any> {

        return this.http.get("http://localhost:54042/api/regions").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    postPlace(place: Place): Observable<any>  {
     
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(
        'http://localhost:54042/api/Places',
        JSON.stringify({
            Name: place.Name,
            Region: {
                Id: place.Region,
                Country : 
                {

                }
            }
        }), opts);
    }
}