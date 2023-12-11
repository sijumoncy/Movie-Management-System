import app from './app';
import { config } from './config/config';
import connectDB from './db/connection';

let server:any;

const port = config.port

const exitHandler = () => {
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };
  
const unexpectedErrorHandler = (error:any) => {
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  if (server) {
    server.close();
  }
});

// connect to db and start server
connectDB().then(() => {
    server = app.listen(port, () => {
        console.log(`App is Running in Port : ${port}`)
    })
}).catch((err) => {
    console.log("Server Down : ", err);
})