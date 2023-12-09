import express from 'express'
import helmet from "helmet";
import cors from 'cors';

const app = express()

// set security HTTP headers
app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

export default app;