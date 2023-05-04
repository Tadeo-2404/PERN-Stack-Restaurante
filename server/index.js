import associations from './db/associations.js';
const { Administrador, Administrador_Direccion, Cliente, Orden, Orden_Detalle, Platillo, } = associations;

//import express and json
import express, { json } from 'express'

//import env vars
import dotenv from 'dotenv';

//import cors
import cors from 'cors';

import clienteRoutes from './routes/clienteRoutes.js'; //rutas cliente
import platilloRoutes from './routes/platilloRoutes.js'; //rutas platillo
import ordenRoutes from './routes/ordenRoutes.js'; //rutas orden
import ordenDetalleRoutes from './routes/ordenDetalleRoutes.js'; //rutas orden_detalle

//importar conexion a la base de datos
import sequelize from './db/db.js';

const app = express()
app.use(cors()); //use cors
app.use(json()); //use json format
dotenv.config(); //use env vars
const port = 3000

//auth db sequelize
try {
  await sequelize.authenticate(); //autenticar conexion a la base de datos
  await sequelize.sync({ alter: true }).then(() => console.log('Tablas creadas exitosamente')); //sincronizar las tablas
  console.log('BASE DE DATOS CONECTADA Y MODELOS CREADOS');
} catch (error) {
  console.log(error)
}

//using client router
app.use('/cliente', clienteRoutes);
app.use('/api/platillo', platilloRoutes);
app.use('/api/orden', ordenRoutes);
app.use('/api/orden_detalle', ordenDetalleRoutes);

//listening backend port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})