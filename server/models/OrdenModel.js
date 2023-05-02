import { DataTypes, Model } from 'sequelize';
import Orden_Detalle from './OrdenDetalleModel.js'; //importar Modelo Orden
import Cliente from './ClienteModel.js';
import sequelize from '../db/db.js'; //importar conexion db

class Orden extends Model {}

Orden.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    sequelize,
    timestamps: false,
    tableName: 'Orden',
    modelName: 'Orden'
});

//definir foreing key de pertenencia a Orden
Orden.hasOne(Cliente, {foreignKey: 'id'}); //una orden tiene un cliente
Orden.belongsTo(Cliente, {foreignKey: 'id'});// una orden pertenece a un cliente
Orden.hasMany(Orden_Detalle, {foreignKey: 'id'}); //una orden tiene uno o mas orden_detalle

export default Orden;