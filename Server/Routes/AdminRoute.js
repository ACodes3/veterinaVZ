import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router()

//LOGIN ROUTES

router.post("/admin-login", (req, res) => {
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

//CATEGORIES ROUTES

router.get('/categories', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.post('/add-category', (req, res) => {
    const sql = "INSERT INTO category (`category_name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true })
    })
})

//SPECIALIZATIONS ROUTES

router.get('/vet-types', (req, res) => {
    const sql = "SELECT * FROM specialization";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

//ROLES ROUTES

router.get('/role-types', (req, res) => {
    const sql = "SELECT * FROM roles";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

//VACCINATIONS ROUTES

router.get('/vaccinations', (req, res) => {
    const sql = "SELECT * FROM vaccinations";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.post('/add-vaccinations', (req, res) => {
    const sql = `INSERT INTO vaccinations (vaccination_name, vaccination_vendor, vaccination_price, vaccination_validity) VALUES (?, ?, ?, ?) `;
    const values = [
        req.body.vaccination_name,
        req.body.vaccination_vendor,
        req.body.vaccination_price,
        req.body.vaccination_validity,
    ]
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Status: false, Error: err })
        return res.json({ Status: true })
    })
})

router.get("/vaccination/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM vaccinations WHERE vaccination_id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.delete("/delete-vaccination/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM vaccinations where vaccination_id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.put("/edit-vaccination/:id", (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE vaccinations SET vaccination_name = ?, vaccination_vendor = ?, vaccination_price = ?, vaccination_validity = ? WHERE vaccination_id = ?`;
    const values = [req.body.vaccination_name, req.body.vaccination_vendor, req.body.vaccination_price, req.body.vaccination_validity, id];
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Status: false, Error: err })
        return res.json({ Status: true, Result: result })
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

//VETERINARIANS ROUTES

router.post("/add-veterinarian", (req, res) => {
    const sql = `INSERT INTO veterinarians (veterinarian_name, veterinarian_email, veterinarian_password, veterinarian_address, specialization_id, category_id, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    bcrypt.hash(req.body.veterinarian_password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        const values = [
            req.body.veterinarian_name,
            req.body.veterinarian_email,
            hash,
            req.body.veterinarian_address,
            req.body.specialization_id,
            req.body.category_id,
            req.body.role_id,
        ]
        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })
        })
    })
})

router.get('/veterinarians', (req, res) => {
    const sql = "SELECT * FROM veterinarians";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get("/veterinarian/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM veterinarians WHERE veterinarian_id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.put("/edit-veterinarian/:id", (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE veterinarians set veterinarian_name = ?, veterinarian_email = ?, veterinarian_password = ?, veterinarian_address = ?, specialization_id = ? Where veterinarian_id = ?`
    const values = [
        req.body.veterinarian_name,
        req.body.veterinarian_email,
        req.body.veterinarian_password,
        req.body.veterinarian_address,
        req.body.specialization_id,
        id,
    ]
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Status: false, Error: err })
        return res.json({ Status: true })
    })
})

router.delete("/delete-veterinarian/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM veterinarians where veterinarian_id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

//PETS ROUTES

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
    const sql = "DELETE FROM pets where pet_id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

//PET OWNERS ROUTES

router.post("/add-pet-owners", (req, res) => {
    const sql = `INSERT INTO owners (owner_name, owner_emso, owner_birthdate, owner_email, owner_password, owner_phone, owner_address, category_id, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    bcrypt.hash(req.body.owner_password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: err })
        const values = [
            req.body.owner_name,
            req.body.owner_emso,
            req.body.owner_birthdate,
            req.body.owner_email,
            hash,
            req.body.owner_phone,
            req.body.owner_address,
            req.body.category_id,
            req.body.role_id,
        ]
        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })
        })
    })
})

router.get('/pet-owners', (req, res) => {
    const sql = "SELECT * FROM owners";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get("/pet-owner/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM owners WHERE owner_id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.put("/edit-pet-owner/:id", (req, res) => {
    const id = req.params.id;
    console.log("ID:", id); // Add this line to inspect the value of id
    const sql = `UPDATE owners SET owner_name = ?, owner_emso = ?, owner_email = ?, owner_password = ?, owner_phone = ?, owner_address = ? WHERE owner_id = ?`;
    const values = [
        req.body.owner_name,
        req.body.owner_emso,
        req.body.owner_email,
        req.body.owner_password,
        req.body.owner_phone,
        req.body.owner_address,
        id, // Ensure id is a single value
    ];
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Status: false, Error: err });
        return res.json({ Status: true, Result: result });
    });
});

router.delete("/delete-pet-owner/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM owners where owner_id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

//DASHBOARD COUNT ROUTES

router.get("/admin-count", (req, res) => {
    const sql = "SELECT count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get("/veterinarians-count", (req, res) => {
    const sql = "SELECT count(veterinarian_id) as veterinarian from veterinarians";
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
    const sql = "SELECT count(owner_id) as petowners from owners";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

//ADMIN ROUTES

router.get("/admin-records", (req, res) => {
    const sql = "SELECT * from admin";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get("/admin/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM admin WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.post("/add-admin", (req, res) => {
    // Log request body
    console.log("Request Body:", req.body);

    // Check if password is present in the request body
    if (!req.body.password) {
        console.error("Password is missing in request body");
        return res.json({ Status: false, Error: "Password is missing" });
    }

    // Hash the password
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.json({ Status: false, Error: "Error hashing password" });
        }

        // SQL query with hashed password and correct values format
        const sql = `INSERT INTO admin (email, password, category_id, role_id) VALUES (?, ?, ?, ?)`;
        const values = [
            req.body.email,
            hash, // Use the hashed password
            req.body.category_id,
            req.body.role_id,
        ];
        con.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.json({ Status: false, Error: "Error executing SQL query" });
            }
            console.log("Admin added successfully");
            return res.json({ Status: true });
        });
    });
});

router.put("/edit-admin/:id", (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE admin SET email = ?, password = ? WHERE id = ?`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        const values = [req.body.email, req.body.password, id];
        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true, Result: result })
        })
    })
})

router.delete("/delete-admin/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM admin where id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

//COMBINED TABLE WITH THE PETS AND OWNERS

router.get('/pets-and-owner', (req, res) => {
    const sql = "SELECT pets.*, owners.* FROM pets INNER JOIN owners ON pets.owner_id = owners.owner_id";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

//COMBINED TABLE FOR PETS AND THEIR OWNER (1 OWNER - MULTIPLE PETS)

router.get('/pets-and-owner/:owner_id', (req, res) => {
    const owner_id = req.params.owner_id; // Retrieve the owner_id from the request parameters
    const sql = "SELECT pets.*, owners.* FROM pets INNER JOIN owners ON pets.owner_id = owners.owner_id WHERE pets.owner_id = ?";
    con.query(sql, [owner_id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get("/logout", (req, res) => {
    res.clearCookie("token")
    return res.json({ Status: true })
})

export { router as adminRouter }