import { Accommodation } from '../model/accomodation.model';
import { Region } from '../model/region.model';

export class Place{

   constructor(public Id: number, 
    public Name: string, public Code: number,
    public Region: Region, public Accommodations: Accommodation[]){

    }
}