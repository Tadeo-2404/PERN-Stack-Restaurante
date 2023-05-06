import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js'; //importar conexion db

class CredencialesAdministrador extends Model {}

CredencialesAdministrador.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    rol: {
        type: DataTypes.STRING,
        defaultValue: "administrador"
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'credencialesAdministrador',
    modelName: 'credencialesAdministrador'
});

export default CredencialesAdministrador