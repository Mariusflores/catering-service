import {Router} from "express";

export function profileApi(db) {

    const router = new Router()

    router.get("", async (req, res) => {

        if (req.signedCookies) {

            try {
                const user = await db.collection("users").findOne({username: req.signedCookies.username})


                if (user) {
                    res.json({username: user.username});
                } else {
                    res.status(400).send("User Not Found");
                }
            } catch (error) {
                console.error("Error in ProfileApi", error)
                res.status(500).send("Internal Server Error");
            }

        } else {
            res.status(400).send("No signed cookies found")
        }
    })


    return router;
}