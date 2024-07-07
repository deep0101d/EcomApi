import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handeller/ApplicationError.js";

class UserRepository{
      async signUp(newUser){
        try{
        //1.Get the database
        const db=getDB();
        //2.get the collection
        const collection=db.collection('users');
        
         await   collection.insertOne(newUser);
            return newUser;
        }catch(err)
        {
            console.log(err);
            throw new ApplicationError("Something Went wrong");
        }
            
}
//sigin
async signIn(email,password){
    try{
    //1.Get the database
    const db=getDB();
    //2.get the collection
    const collection=db.collection('users');
   return await collection.findOne({email,password});
    }catch(err)
    {
        console.log(err);
        throw new ApplicationError("Something Went wrong");
    }
        
}
async FindByemail(email){
    try{
    //1.Get the database
    const db=getDB();
    //2.get the collection
    const collection=db.collection('users');
   return await collection.findOne({email});
    }catch(err)
    {
        console.log(err);
        throw new ApplicationError("Something Went wrong");
    }
       
}
}

export default UserRepository;