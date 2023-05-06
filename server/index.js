import associations from './db/associations.js';
const { Administrador, Administrador_Direccion, Cliente, Orden, Orden_Detalle, Platillo, Credenciales } = associations;
import express, { json } from 'express' //importar express and json
import dotenv from 'dotenv'; //importar env vars
import cors from 'cors'; //importar cors
import cookieParser from 'cookie-parser'; //importar cookie-parse
import { eliminarClientesNoConfirmados } from './helpers/cron.js';

//rutas
import clienteRoutes from './routes/clienteRoutes.js'; //rutas cliente
import platilloRoutes from './routes/platilloRoutes.js'; //rutas platillo
import ordenRoutes from './routes/ordenRoutes.js'; //rutas orden
import ordenDetalleRoutes from './routes/ordenDetalleRoutes.js'; //rutas orden_detalle

//importar conexion a la base de datos
import sequelize from './db/db.js';

const app = express()
app.use(cors()); //usar cors
app.use(json()); //usar json format
app.use(cookieParser());//usar cookieParser
dotenv.config(); //usar env vars
eliminarClientesNoConfirmados.start(); //iniciar cron 
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