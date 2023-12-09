// create connection to mongo
import mongoose, {ConnectOptions} from "mongoose";
import { config } from "../config/config";

const connectDB = async () => {
    try{
        await mongoose.connect(config.mongo.url, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            dbName:config.mongo.dbName
        } as ConnectOptions );

        const connection = mongoose.connection;

        if(connection.readyState >=1) {
            if(config.env === 'development') {
                console.log("connected to database");
            }
            return connection;
        }

        connection.on("error", () => {
            if(config.env === 'development') {
                console.error("connection failed");
            }
            throw new Error("server down")
        })

    } catch (err) {
        if(config.env === 'development') {
            console.error(err);
        }
        throw new Error("server down")
    }
}

export default connectDB;