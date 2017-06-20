import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RoomReservationComponent } from './roomReservation/roomReservation.component';
import { RoomComponent } from './room/room.component';
import { AccommodationTypeComponent } from './accommodationType/accommodationType.component';
import { CommentComponent } from './comment/comment.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { RegionComponent } from './region/region.component';
import { CountryComponent } from './country/country.component';
import { PlaceComponent } from './place/place.component';
import { LoginComponent } from './login/login.component';

import { HttpUserService } from './services/http-user.service';
import { HttpPlaceService } from './services/http-place.service';
import { HttpAccommodationTypeService } from './services/http-accommodation-type.service';
import { HttpAccommodationService } from './services/http-accommodation.service';
import { HttpRoomService } from './services/http-room.service';
import { HttpRoomReservationService } from './services/http-room-reservation.service';
import { HttpCountryService } from './services/http-country.service';

import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { NotificationsComponent } from './notifications/notifications.component';

import { LoggedInGuard } from './logged-in.guard'

import { MapComponent } from './map/map.component';

import { AgmCoreModule } from '@agm/core';
import { AccommodationFilterPipe } from './accommodation/searchAcc.component';

const Routes = [
  {path: "users", component: UserComponent},
   {path: "roomReservations", component: RoomReservationComponent},
   {path: "rooms", component: RoomComponent},
   {path: "accommodationTypes", component: AccommodationTypeComponent},
   {path: "comments", component: CommentComponent},
   {path: "accommodations", component: AccommodationComponent},
   {path: "regions", component: RegionComponent},
   {path: "countries", component: CountryComponent},
   {path: "places", component: PlaceComponent},
   {path: "login", component: LoginComponent},
   {path: "map", component: MapComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RoomReservationComponent,
    RoomComponent,
    AccommodationTypeComponent,
    CommentComponent,
    AccommodationComponent,
    RegionComponent,
    CountryComponent,
    PlaceComponent,
    LoginComponent,
    MapComponent,
    NotificationsComponent,
    AccommodationFilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    HttpModule,
    JsonpModule,
    FormsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
  ],
  providers: [HttpUserService, HttpPlaceService, HttpAccommodationTypeService, HttpRoomService,  AuthService,
   LoggedInGuard, HttpAccommodationService, NotificationService, HttpRoomReservationService, HttpCountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
