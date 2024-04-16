import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router()

//LOGIN ROUTES

router.post("/veterinarian-login", (req, res) => {
    const sql = "SELECT * from veterinarians Where veterinarian_email = ? and veterinarian_password = ?"
    con.query(sql, [req.body.veterinarian_email, req.body.veterinarian_password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" })
        if (result.length > 0) {
            const email = result[0].veterinarian_email;
            const token = jwt.sign({ role: "veterinarian", email: email }, "jwt_secret_key", { expiresIn: "1d" })
            res.cookie("token", token)
            return res.json({ loginStatus: true, id:result[0].owner_id })
        } else return res.json({ loginStatus: false, Error: "Wrong email or password" })
    })
})

export {router as VetRouter}