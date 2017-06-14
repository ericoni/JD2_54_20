import { Accommodation } from '../model/accomodation.model';
import { User } from '../model/user.model';
import { Room } from '../model/room.model';

export class RoomReservation{

    constructor(public Id: number, 
    public StartDate: Date, public EndDate: Date,
    public TimeStamp: Date, public AppUser: User,
    public Room: Room
     ){

    }

}