import { Sequelize, DataTypes, Model } from 'sequelize';
import Orden_Detalle from './OrdenDetalleModel.js';//importar modelo Orden_Detalle
import sequelize from '../db/db.js'; //importar conexion db

class Platillo extends Model {}

Platillo.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_platillo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion_platillo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    precio_platillo: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    sequelize,
    timestamps: false,
    tableName: 'Platillo',
    modelName: 'Platillo'
})

//definir foreign keys modelo Platillo
Platillo.belongsTo(Orden_Detalle, {foreignKey: 'id'}); //un platillo pertenece a una orden_detalle

export default Platillo