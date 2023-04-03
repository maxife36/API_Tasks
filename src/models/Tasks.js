const {DataTypes} = require("sequelize");

// exporto una funcion que recibe como parametro una instancia de sequelize, en donde posteriormente en el index.js se crea la instancia y se la inyecta

module.exports = (sequelize) => {
    return sequelize.define("Tasks",{
        id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        task_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        finish: {
            type: DataTypes.DATEONLY
        },
        description: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.ENUM,
            values: ["Pendiente","Iniciado","Finalizado","Pausado"],
            defaultValue: "Pendiente"
        }
    },
    {
        timestamps: false,
        createdAt: false,
      }
    )
}