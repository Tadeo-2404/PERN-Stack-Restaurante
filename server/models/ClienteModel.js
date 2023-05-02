import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js'; //importar conexion db

class Cliente extends Model {}

Cliente.init({
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
    tableName: 'cliente',
    modelName: 'cliente'
});

export default Cliente