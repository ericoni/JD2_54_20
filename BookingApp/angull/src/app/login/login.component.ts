import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
import { User } from '../model/user.model';

import { AuthService } from '../services/auth.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    public token: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService) { }

    ngOnInit() {
        // reset login status
        this.authService.logout();

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit(user : any, form: NgForm) {
        this.loading = true;
        this.authService.login(user.Name, user.Pass);
            console.log(user);
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

    getUserName(): any{
    let user = JSON.parse(localStorage.getItem("currentUser"));
    return user.username;
  }
}