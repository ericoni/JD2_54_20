import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpUserService } from '../services/http-user.service'
import { User } from '../model/user.model'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [HttpUserService]
})
export class UserComponent implements OnInit {

  users : User [];

  constructor(private HttpUserService: HttpUserService) { }

  ngOnInit() {
    this.HttpUserService.getUsers().subscribe(
      (user: any) => {this.users = user; console.log(this.users)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

}
