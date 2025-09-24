const { DataTypes } = require('sequelize');
const sequelize = require('../Conexion/database');

const producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('Disponible', 'No disponible'),
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url_fotografia: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'productos',
    timestamps: false
});  

module.exports=producto