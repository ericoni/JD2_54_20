import { Region } from '../model/region.model';

export class Country{

    constructor(public Id: number, 
    public Name: string, public Code: number,
    public Password: string, public Regions: Region[]){

    }

}