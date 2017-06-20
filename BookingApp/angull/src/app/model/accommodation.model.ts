import { AccommodationType } from '../model/accommodation-type.model';
import { User } from '../model/user.model';
import { Room } from '../model/room.model';
import { Place } from '../model/place.model';

export class Accommodation{

    constructor(public Id: number, 
    public Name: string, public Description: string,
    public Address: string, public AvrageGrade: number,
    public Latitude: string, public Longitude: string,
    public ImageURL: string, public Approved: boolean,
    public User: User, public Rooms: Room[],
    public Comments: Comment[], public AccommodationType: AccommodationType,
    public Place: Place
     ){


    }

}