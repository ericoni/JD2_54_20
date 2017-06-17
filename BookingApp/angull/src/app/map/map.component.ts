import { Component, OnInit, Input } from '@angular/core';
import {MapInfo} from './map-info.model'
import {Accommodation} from '../model/accommodation.model';
import {HttpAccommodationService} from '../services/http-accommodation.service';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 600px; width: 900px;}'] //postavljamo sirinu i visinu mape
})
export class MapComponent implements OnInit {

  defaultInfo : MapInfo;
  accomodationsMapInfo: MapInfo[] = [];
  accomodations : Accommodation[] = [];
  mapInfo : MapInfo;

  constructor(private accommodationService: HttpAccommodationService) { 
      
      this.defaultInfo = new MapInfo(45.242268, 
                                    19.842954, 
                                    "assets/ftn.png",
                                    "Jugodrvo" , 
                                    "" , 
                                    "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
  }

  private getAccommodations() : void {
        this.accommodationService.getAccommodations().then(accommodations => {this.accomodations = accommodations; 
                                                                              this.doMapping();});
      }      

  private doMapping() : void {
        
        debugger
        for(let accommodation of this.accomodations) {
            this.mapInfo;
            
            this.mapInfo = new MapInfo(Number(accommodation["Latitude"]),
                                  Number(accommodation["Longitude"]),
                                  "http://www.zosekiza.rs/wp-content/uploads/2016/02/ftn.png",
                                  "Jugodrvo" , 
                                  "" , 
                                  "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");

            this.accomodationsMapInfo.push(this.mapInfo);
        }
  }

  ngOnInit() : void {
        this.getAccommodations();
  }
}