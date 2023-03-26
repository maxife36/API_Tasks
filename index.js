const express = require('express')
const server = express()
const PORT = 3002;
const { sequelize } = require("./src/models/index.js");
const fn = require ("./src/controller/index.js")

server.use(express.json({ limit: "50mb" }));


server.get("/Tasks", fn.allTasks)
server.post("/NewTask", fn.createNewTask)
server.get("/search/category", fn.searchByCategory)
server.get("/search/:id", fn.searchByPk)
server.put("/Updates", fn.updateTask)
server.delete("/Delete", fn.destroyByPk)



sequelize.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Se conecto correctamente al puerto ${PORT}`);
  });
  console.log("SE SINCRONIZÓ CORRECTAMENTE LA BASE DE DATOS");
});
