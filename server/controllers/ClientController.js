import connection from "../db/db.js"

const login_client = (req, res) => {
    res.json({msg: "login"})
}

export {
    login_client
}