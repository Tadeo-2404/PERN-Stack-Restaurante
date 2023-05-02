import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js'; //importar conexion db
import Administrador_Direccion from './AdminDireccionModel.js';

class Administrador extends Model {}

Administrador.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_de_nacimiento: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'Administrador',
    modelName: 'Administrador'
});

//definir foreign keys modelo Administrador
Administrador.hasOne(Administrador_Direccion, {foreignKey: 'id'}); //administrador tiene una direccion

export default Administrador