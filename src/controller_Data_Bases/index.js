const { Tasks } = require("../models/index");
const validator = require("validator");

//CONTASTES DE ERRORES
const taskErrorNotFound = new Error("task not found");

//--------------------------------------------------------------------

let getTaskByID = async (id) => {
  if (!validator.isUUID(id)) throw new Error("No se ingreso un ID valido");

  let task = await Tasks.findByPk(id);

  if (task === null) {
    throw taskErrorNotFound;
  }
  return task;
};

let getTaskByCategory = async (category) =>{
  
    let task = await Tasks.findAll({
      where: { category: category }
    })
  
    if(!task.length) throw new Error("Category Not Found");
  
    return task
  };

let filterRequest = async (body, query_id) =>{

    if (!validator.isUUID(query_id)) throw new Error("No se ingreso un ID valido");

   let updateObject = {
    task_name: body.task_name,
    category: body.category,
    start: body.start,
    finish: body.finish,
    description: body.descritpion,
    status: body.status
  }

  let task = await Tasks.update(
    updateObject, 
    {where: {id: query_id}}
  )
  if (!task[0]) {
    throw taskErrorNotFound;
  }
  return task;

}

let deleteById = async (id) => {

    if (!validator.isUUID(id)) throw new Error("No se ingreso un ID valido");
    
    let task = await Tasks.destroy({
      where:{id: id}
    });

    return task
}





  module.exports = {
    taskErrorNotFound,
    getTaskByID,
    getTaskByCategory,
    filterRequest,
    deleteById

  }