/*import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../model/user.model';

@Injectable()
export class AuthService{
    loggedIn : boolean;
    users : User[];

    private headers = new Headers();

    

    constructor(private http: Http){
        
    }

    logIn(username: string, password: string): void{   
        this.headers.append('Content-type', 'application/x-www-form-urlencoded');

        let options : RequestOptions = new RequestOptions();
        options.headers = this.headers;
        debugger
        this.http.post('http://localhost:54042/oauth/token', `username=${username}&password=${password}&grant_type=password`, options)
            .subscribe((response: Response) => {
                debugger
                // login successful if there's a jwt token in the response
                let user = response.json().access_token;
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', JSON.stringify({ username: username, password: password}));
                    console.log(localStorage.getItem("token"));
                    debugger
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
}*/
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
        debugger

       this.http.post('http://localhost:54042/oauth/token', `username=${username}&password=${password}&grant_type=password`, options)
            .subscribe((response: Response) => {
                debugger
                    let token = response.json().access_token;
                    if (token) {
                        // set token property
                        this.token = token;

                        //set user role
                        var role = response.headers.get('role');

                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, role : role }));
                        console.log(this.isLoggedIn());
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