import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../model/user.model';

@Injectable()
export class AuthService{
    loggedIn : boolean;
    users : User[];

    

    constructor(private http: Http){
        
    }

    logIn(username: string, password: string): void{   
        const headers : Headers = new Headers();
        headers.append('Content-type', 'application/json');

        const options : RequestOptions = new RequestOptions();
        options.headers = headers;
        this.http.post('http://localhost:54042/oauth/token', JSON.stringify({ username: username, password: password }), options)
            .map((response: Response) => {
                debugger
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', JSON.stringify(user));
                }
            });
            debugger
            console.log(this.isLoggedIn());
    }

    logOut(): void{
        localStorage.removeItem("token");
    }

    isLoggedIn(): boolean{
        if(localStorage.getItem("token") !== null)
            return true;
        else
            return false;
    }
}