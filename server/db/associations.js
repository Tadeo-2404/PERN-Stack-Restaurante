import Administrador from '../models/AdminModel.js'
import Cliente from '../models/ClienteModel.js';
import Orden from '../models/OrdenModel.js';
import Orden_Detalle from '../models/OrdenDetalleModel.js';
import Platillo from '../models/PlatilloModel.js';
import CredencialesCliente from '../models/CredencialesClienteModel.js';
import CredencialesAdministrador from '../models/CrendencialesAdminModel.js';

//CLIENTE - CREDENCIALES RELACION
Cliente.hasOne(CredencialesCliente, {
  foreignKey: 'clienteId',
  onDelete: 'CASCADE'
});
CredencialesCliente.belongsTo(Cliente, {foreignKey: 'clienteId'});

//ADMINISTRADOR - CREDENCIALES RELACION
Administrador.hasOne(CredencialesAdministrador, {
  foreignKey: 'administradorId',
  onDelete: 'CASCADE'
});
CredencialesAdministrador.belongsTo(Administrador, {foreignKey: 'administradorId'});

//CLIENTE - ORDEN RELACION
Cliente.hasMany(Orden, { 
  foreignKey: 'clienteId', // establece la clave foránea para la relación
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE' ,
}); // un cliente tiene una o mas ordenes
Orden.belongsTo(Cliente, { foreignKey: 'clienteId' }); // una orden pertenece a un cliente

//ORDEN - ORDEN_DETALLE RELACION
Orden.hasMany(Orden_Detalle, { 
  foreignKey: 'ordenId', // establece la clave foránea para la relación
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
}); // una orden tiene uno o mas orden_detalle
Orden_Detalle.belongsTo(Orden, { foreignKey: 'ordenId' }); // orden_detalle pertenece a una orden

//ORDEN_DETALLE - PLATILLO RELACION
Orden_Detalle.belongsTo(Platillo, { foreignKey: 'platilloId' });
Platillo.hasMany(Orden_Detalle, { foreignKey: 'platilloId' });

// exportar los modelos y las asociaciones
export default {
  Administrador,
  Cliente,
  Orden,
  Orden_Detalle,
  Platillo,
  CredencialesCliente,
  CredencialesAdministrador
};
