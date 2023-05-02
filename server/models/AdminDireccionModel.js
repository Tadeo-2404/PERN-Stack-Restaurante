import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js'; //importar conexion db
import Administrator from './AdminModel.js';

class Administrador_Direccion extends Model {}

Administrador_Direccion.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    calle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    colonia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero_de_casa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo_postal: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    timestamps: false,
    tableName: 'Administrador_Direccion',
    modelName: 'Administrador_Direccion'
});

//definir foreign keys Administrador_Direccion
Administrador_Direccion.belongsTo(Administrator, {foreignKey: 'id'});

export default Administrador_Direccion