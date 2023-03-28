import express from 'express';
import { confirm_account_client, forgot_password_client, forgot_password_token_client, login_client, profile, profile_edit, register_client } from '../controllers/ClientController.js';
const router = express.Router();

/* ---  PUBLIC AREA --- */
//login (allows user to login)
router.post("/", login_client)

//create account (creates new account)
router.post('/register', register_client);

//confirm account (confirm user account)
router.get("/confim-my-account/:token", confirm_account_client);

//forgot password (sends email for the new password)
router.post("/forgot-password", forgot_password_client);

//forgot password - confirm new password (writes down new password and sends it)
router.post("/forgot-password/:token", forgot_password_token_client);

/* ---  PRIVATE AREA --- */
//profile (shows user profile)
router.get("/profile", profile);

//profile edting (allows user to edit his profile)
router.post("/profile/edit", profile_edit);

export default router