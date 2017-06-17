import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Place } from '../model/place.model';
import { Accommodation } from '../model/accommodation.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpAccommodationService{
       headers: Headers;

    constructor (private http: Http){
        this.headers = new Headers();
        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = this.headers;
    }

    // getPlaces(): Observable<any> {

    //     return this.http.get("http://localhost:54042/api/places").map(this.extractData);        
    // }

    // getRegions(): Observable<any> {

    //     return this.http.get("http://localhost:54042/api/regions").map(this.extractData);        
    // }

    // private extractData(res: Response) {
    //     let body = res.json();
    //     return body || [];
    // }

// ovo je koristilo do cetvrtka!
    // postAccommodation(accommodation: any): Observable<any>  {
     
    //     const headers: Headers = new Headers();
    //     headers.append('Accept', 'application/json');
    //     headers.append('Content-type', 'application/json');

    //     const opts: RequestOptions = new RequestOptions();
    //     opts.headers = headers;

    //     return this.http.post(
    //     'http://localhost:54042/api/Accommodations',
        // JSON.stringify({
        //     Name: accommodation.Name,
        //     Address: accommodation.Address,
        //     Description: accommodation.Description,
        //     Latitude: accommodation.Latitude,
        //     Longitude: accommodation.Longitude,
        //     ImageURL: accommodation.ImageURL,
        //     User: {

        //     },
        //     AccomodationType: {
        //         Id: accommodation.AccommodationType,
        //     },
        //      Place: {
        //         Id: accommodation.Place,
        //     }
        // }), opts);
    // }

    //   create(name: string): Promise<Hero> {
    //     return this.http
    //         .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
    //         .toPromise()
    //         .then(res => res.json().data as Hero)
    //         .catch(this.handleError);
    // }   

    postAccommodation(accommodation: any): Promise<any> {
        return this.http
            .post('http://localhost:54042/api/Accommodations', 
            JSON.stringify({
                Name: accommodation.Name,
                Address: accommodation.Address,
                Description: accommodation.Description,
                Latitude: accommodation.Latitude,
                Longitude: accommodation.Longitude,
                ImageURL: accommodation.ImageURL,
                User: {

                },
                AccomodationType: {
                    Id: accommodation.AccommodationType,
                },
                Place: {
                    Id: accommodation.Place,
                    Region: {
                        Country: {

                        }
                    }
                },
                UserOwner: {

                }
                
        }),
             {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Accommodation)
            .catch(this.handleError);
    }   

      getAccommodations(): Promise<Accommodation[]> {
        return this.http.get("http://localhost:54042/api/Accommodations")
                    .toPromise()
                    .then(response => response.json() as Accommodation[])
                    .catch(this.handleError);
     }

    getUnapprovedAccommodations(): Promise<Accommodation[]> {
        return this.http.get("http://localhost:54042/api/Accommodations2")
                    .toPromise()
                    .then(response => response.json() as Accommodation[])
                    .catch(this.handleError);
     }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    postAccommodationApproval(accommodation: any): Promise<any> {
        return this.http
            .post('http://localhost:54042/api/Accommodations2', 
            JSON.stringify({
                Id: accommodation,
                User: {

                },
                AccomodationType: {
                    
                },
                Place: {
                   
                    Region: {
                        Country: {

                        }
                    }
                },
                UserOwner: {

                }
        }),
             {headers: this.headers})
            .toPromise()
            .then(res => res.json() as any)
            .catch(this.handleError);
    }   

}