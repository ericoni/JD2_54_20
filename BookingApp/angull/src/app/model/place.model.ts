import { Accommodation } from '../model/accommodation.model';
import { Region } from '../model/region.model';

export class Place{

   constructor(public Id: number, 
    public Name: string, public Code: number,
    public Region: Region, public Accommodations: Accommodation[]){

    }
}