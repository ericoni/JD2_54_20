import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpUserService{
    headers: Headers;

    constructor (private http: Http){
        this.headers = new Headers();
        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = this.headers;
    }

     getUsers(): Observable<any> {

         return this.http.get("http://localhost:54042/api/appuser").map(this.extractData);    // srediti userre  
     }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

//    getUsers(): Promise<User[]> {
//         return this.http.get("http://localhost:54042/api/Accommodations")
//                     .toPromise()
//                     .then(response => response.json() as User[])
//                     .catch(this.handleError);
//      }

//     private handleError(error: any): Promise<any> {
//         console.error('An error occurred', error); // for demo purposes only
//         return Promise.reject(error.message || error);
//     }   
}