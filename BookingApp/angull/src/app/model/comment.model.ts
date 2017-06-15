import { Accommodation } from '../model/accommodation.model';
import { User } from '../model/user.model';

export class Comment{

    constructor(public Id: number, 
    public Grade: number, public Text: string,
    public User: User, public Accommodation: Accommodation
     ){

    }

}