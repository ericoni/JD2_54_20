import { Accommodation } from '../model/accommodation.model';
import { User } from '../model/user.model';
import { Room } from '../model/room.model';

export class RoomReservation{

    // constructor(public Id: number, 
    // public StartDate: Date, public EndDate: Date,
    // public TimeStamp: Date, public AppUser: User,
    // public Room: Room
    //  ){

    // }
    Id: number;
    StartDate: Date;
    EndDate: Date;
    TimeStamp: Date;
    User: User;
    Room: Room;

}