import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AccommodationType } from '../model/accommodation-type.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpAccommodationTypeService{

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

    // getAccommodationTypes(): Observable<any> {

    //     return this.http.get("http://localhost:54042/api/AccommodationTypes").map(this.extractData);        
    // }

    // private extractData(res: Response) {
    //     let body = res.json();
    //     return body || [];
    // }

    // postPlace(place: Place): Observable<any>  {
     
    //     const headers: Headers = new Headers();
    //     headers.append('Accept', 'application/json');
    //     headers.append('Content-type', 'application/json');

    //     const opts: RequestOptions = new RequestOptions();
    //     opts.headers = headers;

    //     return this.http.post(
    //     'http://localhost:54042/api/Places',
    //     JSON.stringify({
    //         Name: place.Name,
    //         Region: {
    //             Id: place.Region,
    //             Country : 
    //             {

    //             }
    //         }
    //     }), opts);
    // }
}