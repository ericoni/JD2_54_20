import { Accommodation } from '../model/accomodation.model';

export class AccommodationType{
    constructor(public Id: number, 
    public Name: string, public Accommodations: Accommodation[]){
    }
}