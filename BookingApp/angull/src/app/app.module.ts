import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RoomReservationsComponent } from './roomReservation/roomReservation.component';
import { RoomComponent } from './room/room.component';
import { AccommodationTypeComponent } from './accommodationType/accommodationType.component';
import { CommentComponent } from './comment/comment.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { RegionComponent } from './region/region.component';
import { CountryComponent } from './country/country.component';
import { PlaceComponent } from './place/place.component';

const Routes = [
  {path: "users", component: UserComponent},
   {path: "roomReservations", component: RoomReservationsComponent},
   {path: "rooms", component: RoomComponent},
   {path: "accommodationTypes", component: AccommodationTypeComponent},
   {path: "comments", component: CommentComponent},
   {path: "accommodations", component: AccommodationComponent},
   {path: "regions", component: RegionComponent},
   {path: "countries", component: CountryComponent},
   {path: "places", component: PlaceComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RoomReservationsComponent,
    RoomComponent,
    AccommodationTypeComponent,
    CommentComponent,
    AccommodationComponent,
    RegionComponent,
    CountryComponent,
    PlaceComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
