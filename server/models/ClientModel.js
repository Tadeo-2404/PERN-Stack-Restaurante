import { Sequelize, DataTypes, Model } from 'sequelize';

class Client extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            client_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            middlename: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            tel: {
                type: DataTypes.STRING,
                allowNull: false
            },
            birthDate: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            }
        }, {
            sequelize,
            tableName: 'Client',
            modelName: 'Client',
        });
    }

    static associate(models) {
        Client.hasMany(models.Order);
    }
}

export default Client