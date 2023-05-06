import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js'; //importar conexion db

class CredencialesCliente extends Model {}

CredencialesCliente.init({
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
        defaultValue: "cliente"
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'credencialesCliente',
    modelName: 'credencialesCliente'
});

export default CredencialesCliente