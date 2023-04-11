import { Sequelize, DataTypes, Model } from 'sequelize';

class Platillo extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre_platillo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            descripcion_platillo: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            precio_platillo: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
        }, {
            sequelize,
            tableName: 'Platillo',
            modelName: 'Platillo',
        });
    }

    static associate(models) {
        Platillo.hasMany(models.Carrito_items);
    }
}

export default Platillo