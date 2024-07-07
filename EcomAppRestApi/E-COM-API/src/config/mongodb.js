import {MongoClient} from 'mongodb';
const url=process.env.DB_URL;//ecomdb for ecom API

let client;
 export const connectTOMongoDB=()=>{
    MongoClient.connect(url)
    .then(clientInstanse=>{
        client=clientInstanse;
   console.log("Connected to MongoDB");
    })
.catch(err=>{
    console.log(err);
})
}
export const getDB=()=>
{
return client.db();
}
