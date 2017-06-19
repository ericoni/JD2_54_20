import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {Router} from '@angular/router';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
    
    public token: string;

    private headers = new Headers();
        
    constructor(private http: Http, public router:Router) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser != null)
        {
            this.token = currentUser.token;
        }
    }

    login(username: string, password: string): void {
        
        let hd = new Headers();
        hd.append('Content-Type', 'application/x-www-form-urlencoded');

        let options = new RequestOptions();
        options.headers = hd;

       this.http.post('http://localhost:54042/oauth/token', `username=${username}&password=${password}&grant_type=password`, options)
            .subscribe((response: Response) => {
                    let token = response.json().access_token;
                    if (token) {
                        // set token property
                        this.token = token;

                        //set user role
                        var role = response.headers.get('role');

                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, role : role }));
                        console.log(this.isLoggedIn());
                        console.log("User je: " + localStorage.getItem('currentUser'));
                        // return true to indicate successful login
                        return true;
                    } else {
                        // return false to indicate failed login
                        return false;
                    }
                });
        }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    isLoggedIn(): boolean{
        if (localStorage.getItem('currentUser') === null){
            return false;
        }
        else{
            return true;
        }
    }
}