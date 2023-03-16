import express, { json } from 'express'
import clientRoutes from './routes/clientRoutes.js';
const app = express()
app.use(json());
const port = 3000 

app.use('/client', clientRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})