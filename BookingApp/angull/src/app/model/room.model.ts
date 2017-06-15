import { Accommodation } from '../model/accommodation.model';
import { RoomReservation } from '../model/room-reservation.model';

export class Room{
    constructor(public Id: number,
                public RoomNumber: number, public BedCount: number,
                public Description: string, public PricePerNight: number, 
                public RoomReservations: RoomReservation[], public Accommodation: Accommodation){
    }
}