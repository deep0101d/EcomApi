
import UserModel from "../features/user/user.model.js";
const basicAuthorizer=(req,res,next)=>
{
    //1.check if authorization heade is empty
    const authHeader=req.headers["authorization"];
    if(!authHeader)
    {
        return res.status(401).send("No authorization details found");
    }
    //2.xtract credentials.[Basic qwertyusdfghj345678cvdfgh]
    const base64credentials=authHeader.replace('Basic','');
    console.log(base64credentials);
    //3.decode credentials
    const decodeCreds=Buffer.from(base64credentials,'base64').toString('utf-8');
    const creds=decodeCreds.split(':');
    console.log(creds);
    //4. c

const user=UserModel.getAll().find(u=>u.email==creds[0] && u.password==creds[1]);
if(!user)
{
    return res.status(401).send("No authorization details found");
}
else{
    next();
}
}
export default basicAuthorizer;