import express from 'express'
import helmet from "helmet";
import cors from 'cors';
import { config } from './config/config';
import routes from './routes/v1';

const app = express()

// set security HTTP headers
app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: config.clientApp.url,
    credentials: true,
  };

app.use(cors(corsOptions));

// routes
const baseUrl = config.apiBaseUrl

app.use(`${baseUrl}`, routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    res.status(404).json({message:"Not found"})
});

export default app;