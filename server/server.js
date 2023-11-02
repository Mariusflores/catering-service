import express from "express"
import * as path from "path";
import {MongoClient} from "mongodb";
import {configDotenv} from "dotenv";
import {registerApi} from "./apis/registerApi.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session"
import {loginApi} from "./apis/loginApi.js";

configDotenv();
const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

//Database connection
const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then( async () => {
    console.log("connected to mongodb")
    app.use("/api/register", registerApi(mongoClient.db("Catering")));
    app.use("/api/login", loginApi(mongoClient.db("Catering")))
})

app.use(async (req, res, next) => {
    const {username} = req.signedCookies;

    if (username) {
        try {
            const user = await mongoClient.collection('users').findOne({username: username});

            if (user) {
                req.user = user;
            }
        } catch (error) {
            console.error('Error fetching user data from MongoDB:', error);
        }
    }

    next();
});

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