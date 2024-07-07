
import fs, { link } from 'fs';
import path from 'path';
import winston from 'winston';


// 
const fsPromises=fs.promises;

// async function log(logData)
// {
// try{
// logData=`\n${new Date().toString()}-${logData}`;
//  await fsPromises.appendFile("log.txt",logData);
// }catch(err)
// {
//     console.log("err");
// }
// }
const logger=winston.createLogger({
    level:'info',
    format:winston.format.json(),
    defaultMeta: {service:'request-login'},
    transports: [
        new winston.transports.File({filename:'logs.txt'})
    ]
})
const logMiddleware= async(req,res,next)=>
{
    //1.log request body
    if(!req.url.includes("signin")){
    const logData=`${req.url}-${JSON.stringify(req.body)}`;

   //await log(logData);
   logger.info(logData);
    }
    next();
}
export default logMiddleware;