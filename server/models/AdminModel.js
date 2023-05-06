import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js'; //importar conexion db
import bcrypt from 'bcrypt';

class Administrador extends Model {
    static async comprobarContrasena(contrasena, contrasenaHasheada) {
        return bcrypt.compare(contrasena, contrasenaHasheada);
    }
}

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
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    timestamps: false,
    tableName: 'administrador',
    modelName: 'administrador'
});

//hashear contraseña
Administrador.beforeSave(async (administrador) => {
    const hash = await bcrypt.hash(administrador.contrasena, 10);
    administrador.contrasena = hash;
});


export default Administrador;