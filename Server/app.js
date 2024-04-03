import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './Database/Db.js';
import productRouter from './Routes/Products.routes.js';
const app = express();
dotenv.config({ path: "./.env" });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDb()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log("server listen at", process.env.PORT || 5000)
        })
    })
    .catch((err) => {
        console.log("error in to start the server", err)
    })


app.get('/health', (req, res) => {
    res.status(200).json({ message: "server is healthy" })
})
app.use(productRouter)