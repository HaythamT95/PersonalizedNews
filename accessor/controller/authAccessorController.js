import express from "express";
import { createUser, loginUser } from "../service/userService.js";

const authController = express.Router();

authController.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName) {
        return res.status(400).json({
            error: "firstName is required",
        });
    }

    if (!lastName) {
        return res.status(400).json({
            error: "lastName is required",
        });
    }

    if (!email) {
        return res.status(400).json({
            error: "email is required",
        });
    }

    if (!password) {
        return res.status(400).json({
            error: "password is required",
        });
    }

    try {
        const user = await createUser({ firstName, lastName, email, password });
        res.status(201).json({ user });
    } catch (err) {
        if (err.message === 'Email is taken') {
            res.status(409).json({ error: 'Email is taken' });
        }
        else{
            return res.status(500).json({ error: err })
        }
    }
})

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({
            error: "email is required",
        });
    }

    if (!password) {
        return res.status(400).json({
            error: "password is required",
        });
    }

    try {
        const user = await loginUser({ email, password });
        res.status(200).json({ user });
    } catch (err) {
        if (err.message === 'User not found') {
            res.status(404).json({ error: 'User not found' });
        } else if (err.message === 'Wrong password') {
            res.status(401).json({ error: 'Wrong password' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
})

export default authController;