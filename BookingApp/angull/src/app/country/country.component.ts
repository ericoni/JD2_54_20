import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Http, Response } from '@angular/http';

import { HttpCountryService } from '../services/http-country.service'
import { Country } from '../model/country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  providers: [HttpCountryService]
})
export class CountryComponent implements OnInit {
  countries: Country[];
  error: any;


  constructor(private httpCountryService: HttpCountryService) {
  }

  ngOnInit() {
    this.httpCountryService.getCountries().then(countries => this.countries = countries).catch(error => this.error = error);
  }

  onSubmit(country: Country, form: NgForm) {
    console.log(country);
    this.httpCountryService.postCountry(country);
    form.reset();
  }

  delete(buttonId: any){
    console.log("Usao sam u delete countries" + buttonId);
    this.httpCountryService.delete(buttonId);
  }

}
