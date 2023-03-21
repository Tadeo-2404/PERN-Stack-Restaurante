import express, { json } from 'express'
import cors from 'cors';
import clientRoutes from './routes/clientRoutes.js';
import connection from './db/db.js';
const app = express()
app.use(cors());
app.use(json());
const port = 3000 

try {
  await connection.connect();
  console.log('db connected');
} catch (error) {
  console.log(error)
}

app.use('/client', clientRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})