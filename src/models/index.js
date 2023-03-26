const { Sequelize } = require("sequelize");
const tasksFactory = require("./Tasks.js");

const sequelize = new Sequelize(
  "postgres://{User}:{password}@{host}/{db}",
  { logging: false }
);

//conect my instance of sequelize with my models
const Tasks = tasksFactory(sequelize);


module.exports = {
  sequelize,
  Tasks,
};
// VERIFICA SI SE CONECTO CORRECTAMENTE A LA BASE DE DATOS
// sequelize.authenticate()
//     .then(()=>console.log("entre"))
//     .catch(err => console.log(err))
