import { Accommodation } from '../model/accomodation.model';
import { Comment } from '../model/comment.model';

export class User{

    constructor(public Id: number, 
    public Username: string, public Email: string,
    public Password: string, public Comments: Comment[],
    public Accomodations: Accommodation[]){

    }

}