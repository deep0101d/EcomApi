import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
export default class UserController{
    constructor()
    {
        this.userRepository=new UserRepository();
    }
   async signUp(req,res){
    try{
        const {email,name,password,type}=req.body;
        const hashPassword=await bcrypt.hash(password,12);
        const user=new UserModel(
            email,
            name,
           hashPassword,
            type,
        );
        await this.userRepository.signUp(user);
        res.status(200).send(user);
    }catch(err)
    {
        res.status(404).send(err.message);
    }
    
    }
     async signin(req,res)
    {
        try{
            //1.find user by email
            const user=await this.userRepository.FindByemail(req.body.email);
            if(!user)
            {
                return res.status(400).send("Inc cred");
            }else{
                //compare password with hash
                const result=await bcrypt.compare(req.body.password,user.password);
                if(result){
            //1.crete token
            const token=jwt.sign({
                userID:result.id,
                email:result.name,
            },process.env.JWT_SECRET,{expiresIn:"1h"}
        );
            //2.send token
            return res.status(200).send(token
            );
        }else{
return res.status(400).send("Inc cred");
        }
    }
}catch(err){
       console.log(err);
       return res.status(404).send("Some thing went Wrong");
    }
    }
}

//email,name,password,type