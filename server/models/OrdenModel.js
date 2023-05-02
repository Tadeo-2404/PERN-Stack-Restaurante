import { DataTypes, Model } from 'sequelize';
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
    tableName: 'orden',
    modelName: 'orden'
});

export default Orden;