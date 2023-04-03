const { Sequelize } = require("sequelize");
const tasksFactory = require("./Tasks.js");

//-------Acces Parameters-------
let user = ""
let password = ""
let host =  ""
let dataBase = ""


const sequelize = new Sequelize(
  `postgres://${user}:${password}@${host}/${dataBase}`,
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
