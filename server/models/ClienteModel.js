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
            SELECT "clienteId" FROM "credenciales" WHERE confirmado IS NULL
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
    fecha_de_nacimiento: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    timestamps: false,
    tableName: 'cliente',
    modelName: 'cliente'
});

//hashear contraseña
Cliente.beforeCreate(async (cliente) => {
    const hash = await bcrypt.hash(cliente.contrasena, 8);
    cliente.contrasena = hash;
});

//hasear contraseña al realizar cambio
Cliente.beforeSave(async (cliente) => {
  const hash = await bcrypt.hash(cliente.contrasena, 8);
  cliente.contrasena = hash;
});

export default Cliente