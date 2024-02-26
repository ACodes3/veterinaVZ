import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router()

router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * from admin Where email = ? and password = ?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" })
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: "1d" })
            res.cookie("token", token)
            return res.json({ loginStatus: true })
        } else return res.json({ loginStatus: false, Error: "Wrong email or password" })
    })
})

router.get('/categories', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/vet-types', (req, res) => {
    const sql = "SELECT * FROM vettype";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/vaccination-types', (req, res) => {
    const sql = "SELECT * FROM vaccinationtype";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.post('/add-category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true })
    })
})

//image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Public/images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
//end image upload

router.post("/add-veterinarian", upload.single("image"), (req, res) => {
    const sql = "INSERT INTO veterinarian (name, email, password, salary, address, image, specialization_id, category_id) VALUES (?)";
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.salary,
            req.body.address,
            req.file.filename,
            req.body.specialization_id,
            req.body.category_id,
        ]
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })
        })
    })
})

router.get('/veterinarians', (req, res) => {
    const sql = "SELECT * FROM veterinarian";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get("/veterinarian/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM veterinarian WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.put("/edit-veterinarian/:id", (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE veterinarian set name = ?, email = ?, salary = ?, address = ?, specialization_id = ? Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.specialization_id
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.delete("/delete-veterinarian/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM veterinarian where id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.post("/add-pet", upload.single("image"), (req, res) => {
    const sql = "INSERT INTO pets (pet_owner, pet_nickname, pet_nb_chip, pet_type, pet_breed, pet_gender, pet_birth_date, pet_height, pet_weight, pet_vaccinated, image, pet_vaccination_id, pet_vet_id, category_id, pet_vaccination_date, pet_vaccination_validity) VALUES (?)";
    const values = [
        req.body.pet_owner,
        req.body.pet_nickname,
        req.body.pet_nb_chip,
        req.body.pet_type,
        req.body.pet_breed,
        req.body.pet_gender,
        req.body.pet_birth_date,
        req.body.pet_height,
        req.body.pet_weight,
        req.body.pet_vaccinated,
        req.file.filename,
        req.body.pet_vaccination_id,
        req.body.pet_vet_id,
        req.body.category_id,
        req.body.pet_vaccination_date,
        req.body.pet_vaccination_validity,
    ];
    con.query(sql, [values], (err, result) => {
        if (err) return res.json({ Status: false, Error: err });
        return res.json({ Status: true });
    });
});

router.get('/pets', (req, res) => {
    const sql = "SELECT * FROM pets";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get("/pet/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM pets WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.put("/edit-pet/:id", (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE pets set pet_nickname = ?, pet_nb_chip = ?, pet_type = ?, pet_breed = ?, pet_gender = ?, pet_birth_date = ?, pet_height = ?, pet_weight = ?, pet_vaccinated = ? Where id = ?`
    const values = [
        req.body.pet_nickname,
        req.body.pet_nb_chip,
        req.body.pet_type,
        req.body.pet_breed,
        req.body.pet_gender,
        req.body.pet_birth_date,
        req.body.pet_height,
        req.body.pet_weight,
        req.body.pet_vaccinated,
        req.body.vet_id,
        req.body.pet_vaccination_id,
        req.file.filename,
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.delete("/delete-pet/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM pets where id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.post("/add-pet-owner", (req, res) => {
    const sql = "INSERT INTO petowners (pet_owner_id, pet_nickname, pet_nb_chip, pet_type, pet_breed, pet_gender, pet_birth_date, pet_height, pet_weight, pet_vaccinated, image) VALUES (?)";
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        const values = [
            req.body.pet_owner_name,
            req.body.pet_owner_surname,
            req.body.pet_owner_emso,
            req.body.pet_owner_birth_date,
            req.body.pet_owner_email,
            req.body.pet_owner_telephone,
            req.body.pet_owner_address,
        ]
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })
        })
    })
})

router.get('/pet-owners', (req, res) => {
    const sql = "SELECT * FROM petowners";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get("/pet-owner/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM petowners WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.put("/edit-pet-owner/:id", (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE petowners set pet_nickname = ?, pet_nb_chip = ?, pet_type = ?, pet_breed = ?, pet_gender = ?, pet_birth_date = ?, pet_height = ?, pet_weight = ?, pet_vaccinated = ? Where id = ?`
    const values = [
        req.body.pet_owner_name,
        req.body.pet_owner_surname,
        req.body.pet_owner_emso,
        req.body.pet_owner_birth_date,
        req.body.pet_owner_email,
        req.body.pet_owner_telephone,
        req.body.pet_owner_address,
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.delete("/delete-pet-owner/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM petowners where id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get("/admin-count", (req, res) => {
    const sql = "SELECT count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get("/veterinarians-count", (req, res) => {
    const sql = "SELECT count(id) as veterinarian from veterinarian";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get("/pets-count", (req, res) => {
    const sql = "SELECT count(id) as pets from pets";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get("/pet-owners-count", (req, res) => {
    const sql = "SELECT count(pet_owner_id) as petowners from petowners";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get("/admin-records", (req, res) => {
    const sql = "SELECT * from admin";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get("/logout", (req, res) => {
    res.clearCookie("token")
    return res.json({ Status: true })
})

export { router as adminRouter }