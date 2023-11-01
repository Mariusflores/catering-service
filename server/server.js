import express from "express"
import * as path from "path";

const app = express();

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