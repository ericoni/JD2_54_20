
export class Accommodation{

    constructor(public Id:number, 
    public Username: string, public Email: string,
    public Password: string, public Comments: Comment[],
    public Accomodations: Accommodation[]
     ){


    }

}