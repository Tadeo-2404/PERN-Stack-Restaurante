import pkg from 'pg';
const { Pool } = pkg;

const connection = new Pool ({
    user: "postgres",
    password: "root",
    host: 'localhost',
    port: 5432,
    database: 'restaurante'
})

export default connection;