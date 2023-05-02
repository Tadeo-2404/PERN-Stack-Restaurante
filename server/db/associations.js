import Administrador from '../models/AdminModel.js'
import Administrador_Direccion from '../models/AdminDireccionModel.js';
import Cliente from '../models/ClienteModel.js';
import Orden from '../models/OrdenModel.js';
import Orden_Detalle from '../models/OrdenDetalleModel.js';
import Platillo from '../models/PlatilloModel.js';

// definir las asociaciones entre los modelos
Administrador.hasOne(Administrador_Direccion, {
  foreignKey: 'adminId', 
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
}); // un administrador tiene una direccion
Administrador_Direccion.belongsTo(Administrador, { foreignKey: 'adminId' });

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
  Administrador_Direccion,
  Cliente,
  Orden,
  Orden_Detalle,
  Platillo,
};
