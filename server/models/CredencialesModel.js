import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js'; //importar conexion db

class Credenciales extends Model {}

Credenciales.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    confirmado: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'credenciales',
    modelName: 'credenciales'
});

export default Credenciales