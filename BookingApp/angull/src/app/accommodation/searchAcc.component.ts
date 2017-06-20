import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name : 'AccommodationFilterPipe',
})

export class AccommodationFilterPipe implements PipeTransform {
    transform(accommodations, args:any[]): any {

        let nameSearchBox = args[0];
        let placeSearchBox = args[1];
        let addressSearchBox = args[2];
        let typeSearchBox = args[3];

        let filtredAccommodations = accommodations;

        if(nameSearchBox !== undefined)
        {
            nameSearchBox = nameSearchBox.toLowerCase();

            filtredAccommodations =  filtredAccommodations.filter(function(accomm:any) {
                return ((accomm.Name.toLowerCase().indexOf(nameSearchBox) > -1));
            })
        }

        if(placeSearchBox !== undefined)
        {
            placeSearchBox = placeSearchBox.toLowerCase();

            filtredAccommodations =  filtredAccommodations.filter(function(accomm:any) {
                return ((accomm.Place.Name.toLowerCase().indexOf(placeSearchBox) > -1));
            })
        }

        if(addressSearchBox !== undefined)
        {
            addressSearchBox = addressSearchBox.toLowerCase();

            filtredAccommodations =  filtredAccommodations.filter(function(accomm:any) {
                return ((accomm.Address.toLowerCase().indexOf(addressSearchBox) > -1));
            })
        }
        
        if(typeSearchBox !== undefined)
        {
            typeSearchBox = typeSearchBox.toLowerCase();

            filtredAccommodations =  filtredAccommodations.filter(function(accomm:any) {
                return ((accomm.AccomodationType.Name.toLowerCase().indexOf(typeSearchBox) > -1));
            })
        }

        return filtredAccommodations;
    }
}