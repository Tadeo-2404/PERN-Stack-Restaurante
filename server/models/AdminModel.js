import { Sequelize, DataTypes, Model } from 'sequelize';

class Administrator extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            id_direccion: {
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
            tableName: 'Administrador',
            modelName: 'Administrador',
        });
    }

    static associate(models) {
        Administrator.hasOne(models.administrator_direccion);
    }
}

export default Administrator