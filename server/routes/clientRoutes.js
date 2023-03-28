import express from 'express';
import { login_client } from '../controllers/ClientController.js';
const router = express.Router();

/* ---  PUBLIC AREA --- */
//login (allows user to login)
router.post("/", login_client)

//create account (creates new account)
router.post('/register', (req, res) => {
    res.json(req.body);
});

//confirm account (confirm user account)
router.get("/confim-my-account/:token", (req, res) => {
    res.json({msg: "confirm my account"})
});

//forgot password (sends email for the new password)
router.post("/forgot-password", (req, res) => {
    res.json({msg: "forgot-password"})
});

//forgot password - confirm new password (writes down new password and sends it)
router.post("/forgot-password/:token", (req, res) => {
    res.json({msg: "forgot password :token"})
});

/* ---  PRIVATE AREA --- */
//profile (shows user profile)
router.get("/profile", (req, res) => {
    res.json({msg: "profile"})
});

//profile edting (allows user to edit his profile)
router.post("/profile/edit", (req, res) => {
    res.json({msg: "edting profile"})
});

export default router