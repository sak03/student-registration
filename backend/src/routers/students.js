const express = require("express");
const router = new express.Router();
const Student = require('../models/students');

router.get("/", (req, res) => {

    res.send("Hello, This message from other side by Sartaj.")
})

// === create a new students ======
router.post("/students", async (req, res) => {
    try {
        const studentData = new Student(req.body);
        const createStudent = await studentData.save();
        res.status(201).send(createStudent);
    } catch (err) {
        res.status(400).send(err)
    }
})

// === get all student data ======
router.get("/students", async (req, res) => {
    try {
        const studentData = await Student.find();
        res.send(studentData);
    } catch (err) {
        res.send(err)
    }
})

// ===== student login ===========
router.post("/students/login", async (req, res) => {
    try {
        const studentEmail = req.body.email;
        const password = req.body.password;
        const loginStudent = await Student.findOne({
            email: studentEmail,
            password: password
        });
        res.status(201).send(loginStudent);
    } catch (err) {
        res.send(err)
    }
})

// ==== update student =====
router.put("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body)
        res.status(201).send(updateStudent);
    } catch (err) {
        res.status(404).send(err);
    }
})

// ===== student forgot password ===========
router.patch("/students/forgotPassword", async (req, res) => {
    try {
        const studentEmail = req.body.email;
        const updatePassword = await Student.findOneAndUpdate(
            { email: studentEmail },
            req.body,
            { new: true }
        );
        if (!updatePassword) {
            return res.status(404).json({ error: "Email not found" });
        }
        res.status(201).send(updatePassword);
    } catch (err) {
        res.status(500).send(err)
    }
})




module.exports = router;