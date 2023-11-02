import {Router} from "express";
import bcrypt from "bcrypt";

export function loginApi(db) {

    const router = new Router();


    router.get("/", (req, res) => {

        if (!req.user) {
            res.status(401).json({message: "Invalid input data"})
        }
        const {username, name} = req.user;
        res.json({username, name})
    })

    router.post("/", async (req, res) => {
        const {username, password} = req.body;

        try {
            const user = await db.collection("users").findOne({username: username});

            if (user && (await bcrypt.compare(password, user.password))) {
                res.cookie("username", username, {signed: true});
                res.status(200).json({message: "Login Successful"});
            } else {
                res.status(401).json({message: "Login failed"});
            }
        } catch (error) {
            console.error("Error in login route:", error);
            res.status(500).json({message: "Internal Server Error"});
        }
    });


    return router;
}