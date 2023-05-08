import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js'; //importar conexion db
import bcrypt from 'bcrypt';

class Cliente extends Model {
    static async comprobarContrasena(contrasena, contrasenaHasheada) {
        return bcrypt.compare(contrasena, contrasenaHasheada);
    }

    static async borrarClientesNoConfirmados() {
        try {
          const query = await sequelize.query(`DELETE FROM "cliente" WHERE "id" IN (
            SELECT "clienteId" FROM "credencialesCliente" WHERE confirmado IS NULL
          )`);
          console.log(query);
        } catch (err) {
          console.error(err);
        }
      }         
}

Cliente.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
}, {
    sequelize,
    timestamps: false,
    tableName: 'cliente',
    modelName: 'cliente'
});

//hashear contraseña
Cliente.beforeSave(async (cliente) => {
    const hash = await bcrypt.hash(cliente.contrasena, 10);
    cliente.contrasena = hash;
});

export default Cliente