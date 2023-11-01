import express from "express"
import * as path from "path";
import {MongoClient} from "mongodb";
import {configDotenv} from "dotenv";
import {registerApi} from "./apis/registerApi.js";

configDotenv();
const app = express();

//Database connection
const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then( async () => {
    console.log("connected to mongodb")
    app.use("/api/register", registerApi(mongoClient.db("Catering")))
})

app.use(express.static("../client/dist"))

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")){
        res.sendFile(path.resolve("../client/dist/index.html"))
    }else{
        next();
    }
})

const server = app.listen(process.env.port || 3000, () => {
    console.log("server started at http://localhost:" + server.address().port);
});