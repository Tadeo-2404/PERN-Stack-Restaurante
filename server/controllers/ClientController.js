import connection from "../db/db.js"

//controller for client login (logs in)
const login_client = (req, res) => {
    res.json({msg: "login"})
}

//controller for client register (new account)
const register_client = (req, res) => {
    res.json(req.body);
}

//controller for confirming account (when creates a new one)
const confirm_account_client = (req, res) => {
    res.json({msg: "confirm my account"})
}

//controller for sending email when lost password
const forgot_password_client = (req, res) => {
    res.json({msg: "forgot-password"})
}

//controller restoring password (introduces new one)
const forgot_password_token_client = (req, res) => {
    res.json({msg: "forgot password :token"})
}

//controller show profile user
const profile = (req, res) => {
    res.json({msg: "profile"})
}

//controller allows edting user info
const profile_edit = (req, res) => {
    res.json({msg: "edting profile"})
}

export {
    login_client,
    register_client,
    confirm_account_client,
    forgot_password_client,
    forgot_password_token_client,
    profile,
    profile_edit
}