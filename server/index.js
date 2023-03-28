//import express and json
import express, { json } from 'express'

//import env vars
import dotenv from 'dotenv';

//import cors
import cors from 'cors';

//import client routes
import clientRoutes from './routes/clientRoutes.js';

//import db connection
import connection from './db/db.js'; 

const app = express()
app.use(cors()); //use cors
app.use(json()); //use json format
dotenv.config(); //use env vars
const port = 3000 

//auth db connection
try {
  await connection.authenticate();
  console.log('db connected');
} catch (error) {
  console.log(error)
}

//using client router
app.use('/client', clientRoutes);

//listening backend port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})