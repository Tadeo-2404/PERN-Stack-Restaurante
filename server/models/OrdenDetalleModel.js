import { DataTypes, Model } from 'sequelize';
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
    tableName: 'orden_detalle',
    modelName: 'orden_detalle'
});

export default Orden_Detalle