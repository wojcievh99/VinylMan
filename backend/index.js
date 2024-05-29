import express from "express";
import { port, database } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import StockItemRoute from "./routes/StockItemRoute.js";
import UserRoute from "./routes/UserRoute.js";

const app = express();

app.use(express.json());

app.use(cors()); ///<--- allow all origins 

/*
app.use(cors({ // <--- allow custom origins
    origin: 'http://localhost:5173',
    methods: ['GET', 'PUT', 'DELETE', 'POST'],
    allowedHeaders: ['Content-Type'],
}))
*/
app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Connection...');
});

app.use('/stockItems', StockItemRoute);
app.use('/users', UserRoute);


mongoose
    .connect(database)
    .then(() => {
        console.log("App connected to database...");
        app.listen(port, () => {
            console.log(`App is listening to port: ${port}.`);
        });
    })
    .catch((err) => {
        console.error(err);
    });