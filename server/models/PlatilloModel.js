import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js'; //importar conexion db

class Platillo extends Model {}

Platillo.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    sequelize,
    timestamps: false,
    tableName: 'platillo',
    modelName: 'platillo'
})

export default Platillo