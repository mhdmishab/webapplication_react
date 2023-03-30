
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import path from "path";
const app=express();

app.use(express.static(__dirname + '/public'));

import authRoutes from "./routes/auth.js";
import adminRoute from "./routes/adminRoute.js";


app.use(cors({
    origin: '*'
}));
app.use(morgan('dev'));
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extented: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.json());


/* ROUTES */

app.use("/auth", authRoutes);
app.use("/admin",adminRoute)

app.use((req, res) => {
    res.status(404).json({ success: false, status: 404, message: "Not found" });
});






/* MONGOOSE SETUP*/
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected successfully!");
}).catch((error) => console.log(`${error} did not connect`))
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));