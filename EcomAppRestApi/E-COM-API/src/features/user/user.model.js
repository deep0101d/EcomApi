import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handeller/ApplicationError.js";

export default class UserModel{
    constructor(email,name,password,type,id)
    {
        this.email=email;
        this.name=name;
        this.password=password;
        this.type=type;
        this._id=id; 
    }
   static  async signUp(email,name,password,type){
        try{
        //1.Get the database
        const db=getDB();
        //2.get the collection
        const collection=db.collection('users');
        //3.insert the data
        const newUser = new UserModel(
            email,name,
            password,
            type,
            );
            //3insert
         await   collection.insertOne(newUser);
            return newUser;
        }catch(err)
        {
            throw new ApplicationError("Something Went wrong");
        }
            
}
// static signIn(email,password)
// {
//     let user=users.find((u)=>
//     u.email==email && u.password==password

// );
// return user;
// }
static getAll()
{
    return users;
}
}


let users = [
    {
    id: 1,
    name: 'Seller User',
    email: 'seller@ecom.com',
    password: 'Password1',
    type: 'seller',
    },
    {
        id: 2,
        name: 'Cus User',
        email: 'cus@ecom.com',
        password: 'Password1',
        type: 'cus',
        },
    ];
    