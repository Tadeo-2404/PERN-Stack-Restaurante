import { Sequelize, DataTypes, Model } from 'sequelize';

class Orden extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            descripcion_Orden: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            precio_Orden: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
        }, {
            sequelize,
            tableName: 'Orden',
            modelName: 'Orden',
        });
    }

    static associate(models) {
        Orden.belongsTo(models.cliente, {foreignKey: 'id'});
    }
}

export default Orden