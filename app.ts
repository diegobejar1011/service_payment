import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { indexRouter } from "./shared/indexRouter";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(indexRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Servidor funcionando');
});
