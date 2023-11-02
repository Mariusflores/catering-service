import express, {Router} from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import crypto from "crypto"


export function registerApi(db) {
    const router = new Router();
    router.use(express.json())

    router.post("/", async (req, res) => {
        const {username, password} = req.body;

        //check for existing user
        //if (mongoClient.collection("users").findOne({username: usename}))

        // validate data
        if (!username || !password) {
            return res.status(400).json({message: "Invalid Input Data"})
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // generate random UUID
        const userID = crypto.randomUUID();

        const newUser = new User({id: userID, username: username, password: hashedPassword})

        try {
            await db.collection("users").insertOne(newUser)
            res.status(201).json({message: "User registered successfully"})
        } catch (error) {
            console.error("Error registering user")
            res.status(500).json({message: "Registration failed"})
        }
    });


    return router;
}