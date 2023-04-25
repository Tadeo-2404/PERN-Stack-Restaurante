import { DataTypes, Model } from 'sequelize';
import Orden from './OrdenModel.js'; //importar Modelo Orden
import sequelize from '../db/db.js'; //importar conexion db

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

//definir foreing key de pertenencia a Orden
Orden_Detalle.belongsTo(Orden, {foreignKey: 'id'});

//actualizar table
await Orden_Detalle.sync({alter: true});


export default Orden_Detalle