import app from './app';
import { config } from './config/config';
import connectDB from './db/connection';

let server:any;

const port = config.port


// connect to db and start server
connectDB().then(() => {
    server = app.listen(port, () => {
        console.log(`App is Running in Port : ${port}`)
    })
}).catch((err) => {
    console.log("Server Down : ", err);
})