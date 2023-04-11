import { Sequelize, DataTypes, Model } from 'sequelize';

class Administrador_Direccion extends Model {
    static init(sequelize) {
        return super.init({
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
            tableName: 'administrador_direccion',
            modelName: 'administrador_direccion',
        });
    }

    static associate(models) {
        Administrador_Direccion.hasOne(models.Administrador, {foreignKey: 'id'});
    }
}

export default Administrador_Direccion