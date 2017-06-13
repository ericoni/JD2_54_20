export class Comment{

    constructor(public Id: number, 
    public Username: string, public Email: string,
    public Password: string, public Comments: Comment[]
     ){

    }

}