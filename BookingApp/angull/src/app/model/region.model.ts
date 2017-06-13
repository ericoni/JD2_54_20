import { Place } from '../model/place.model';
import { Country } from '../model/country.model';

export class Region{

    constructor(public Id: number, 
    public Name: string, public Places: Place[],
    public Country: Country){

    }

}