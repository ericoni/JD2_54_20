import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Http, Response } from '@angular/http';

import { HttpAccommodationService } from '../services/http-accommodation.service'
import { HttpPlaceService } from '../services/http-place.service'
import { HttpAccommodationTypeService } from '../services/http-accommodation-type.service';
import { AuthService } from '../services/auth.service';

import { Place } from '../model/place.model';
import { User } from '../model/user.model';
import { AccommodationType } from '../model/accommodation-type.model';
import { Accommodation } from '../model/accommodation.model';
import { AccommodationFilterPipe } from './searchAcc.component'; 

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  providers: [HttpAccommodationService, HttpPlaceService, HttpAccommodationTypeService, AuthService]
})
export class AccommodationComponent implements OnInit {
  places: Place[];
  users: User[];
  accommodationTypes: AccommodationType[];
  unapprovedAccommodations: Accommodation[];
  allAccommodations: Accommodation[];
  allAccommodations1: Accommodation[];
  allAccommodations2: Accommodation[];
  allAccommodations3: Accommodation[];
  error: any;
  i: number = 0;
  j: number = 0;
  pageNumber: number = 1;
  accommcount: number;
  
  constructor(private httpAccommodationService: HttpAccommodationService, 
  private httpPlaceService: HttpPlaceService, private httpAccommodationTypeService: HttpAccommodationTypeService,
  private authService: AuthService) {
  }

  ngOnInit() {
  // this.httpPlaceService.getPlaces().subscribe(
  //     (r: any) => {this.places = r; console.log(this.places)},
  //     error => {alert("Unsuccessful fetch operation!"); console.log(error);}
  //   );
 
    // this.httpAccommodationTypeService.getAccommodationTypes().subscribe(
    //   (ap: any) => {this.accommodationTypes = ap; console.log(this.accommodationTypes)},
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );
    
    this.httpAccommodationTypeService.getAccommodationTypes().then(accommodationTypes => this.accommodationTypes = accommodationTypes).catch(error => this.error = error);
    this.httpPlaceService.getPlaces().then(places => this.places = places).catch(error => this.error = error);
    this.httpAccommodationService.getUnapprovedAccommodations().then(unapprovedAccommodations => this.unapprovedAccommodations = unapprovedAccommodations).catch(error => this.error = error);
    this.httpAccommodationService.getAccommodations()
    .then(allAccommodations => {this.allAccommodations = allAccommodations; 
      this.allAccommodations1 = new Array();
      this.allAccommodations2 = new Array();
      this.allAccommodations3 = new Array();
      this.accommcount = allAccommodations.length;
    for (var index = 0; index < Math.floor(this.accommcount/3); index++) {
      this.allAccommodations1.push(this.allAccommodations[index]);
      this.i = index;
    }
    for (var index1 = 0; index1 < Math.floor(this.accommcount/3); index1++) {
      this.allAccommodations2.push(this.allAccommodations[this.i + index1 + 1]);
      this.j = index1;
    }
    //this.j+=this.i;
    for (var index2 = 0; index2 < this.accommcount-this.j-this.i - 2; index2++) {
      this.allAccommodations3.push(this.allAccommodations[this.i + this.j + index2 + 2]);
    }
  }).catch(error => this.error = error);
    debugger
    //this.authService.logout();
}

 onSubmit(accommodation: any, form: NgForm) {
    console.log(accommodation);
    this.httpAccommodationService.postAccommodation(accommodation);
   //this.httpAccommodationService.postAccommodation(accomodation).subscribe(this.onPost);
    form.reset();
  }

  onPage(pageNum: any) {
    this.pageNumber = pageNum;
    debugger
  }

  onPost(res : any) : void{
    alert("Post!");
    console.log(res.json());
  }

  isLoggedIn(): boolean{
        return this.authService.isLoggedIn();
  }

  getUserRole(): any{
    // let user = JSON.parse(localStorage.getItem("currentUser"));
    // console.log("Rola je: " + user.role);
    // return user.role;
    return this.authService.getUserRole();
  }

  logout(): void {
     this.authService.logout();
    }


  // onSubmit2(accommodation: any, form: NgForm) {
  //   console.log(accommodation);
  //   debugger
  //   this.httpAccommodationService.postAccommodation(accommodation);
  //  //this.httpAccommodationService.postAccommodation(accomodation).subscribe(this.onPost);
  //   form.reset();
  // }

  approve(buttonId: any){
    console.log("Usao sam" + buttonId);
    this.httpAccommodationService.postAccommodationApproval(buttonId);
  }

 
}
