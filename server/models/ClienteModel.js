import { Sequelize, DataTypes, Model } from 'sequelize';

class Client extends Model {
    static init(sequelize) {
        return super.init({
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
            tableName: 'Cliente',
            modelName: 'Cliente',
        });
    }

    static associate(models) {
        Client.hasMany(models.Orden, {foreignKey: 'id'});
        Client.hasOne(models.Carrito,  {foreignKey: 'id'});
    }
}

export default Client