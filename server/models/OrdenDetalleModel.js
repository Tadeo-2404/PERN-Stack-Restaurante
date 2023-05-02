import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js'; //importar conexion db
import Orden from './OrdenModel.js'; //importar Modelo Orden
import Platillo from './PlatilloModel.js';//importar Modelo Platillo

class Orden_Detalle extends Model {}

Orden_Detalle.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    precio_unitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    sequelize,
    timestamps: false,
    tableName: 'Orden_Detalle',
    modelName: 'Orden_Detalle'
});

//definir foreing key de Orden_Detalle
Orden_Detalle.belongsTo(Orden, {foreignKey: 'id'}); //orden_detalle pertenece a una orden
Orden_Detalle.hasOne(Orden, {foreignKey: 'id'}); //orden_detalle tiene una orden id
Orden_Detalle.hasOne(Platillo, {foreignKey: 'id'});//orden_detalle tiene un platillo id

export default Orden_Detalle