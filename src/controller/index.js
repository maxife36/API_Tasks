const { Tasks } = require("../models/index");
const validator = require("validator");
const db_contr = require("../controller_Data_Bases/index")

let allTasks = async (req, res) => {
  try {
    res.status(200).send(await Tasks.findAll());
  } catch (err) {
    res.status(400).send(err, "Bad Request");
  }
};

let createNewTask = async (req, res) => {
  try {
    let { task_name, category, start, finish, description, status } = req.body;

    if (!task_name || !category || !start)
      throw new Error("Faltan datos obligatorios");

    const task = await Tasks.create({
      task_name,
      category,
      start,
      finish,
      description,
      status,
    });

    res.status(200).send("Se creo la tarea con EXITO");
  } catch (err) {
    res.status(400).send(err);
  }
};

let searchByPk = async (req, res) => {
  try {
    let id_searched = req.params.id;
    
    let task = await db_contr.getTaskByID(id_searched);

    res.status(200).send(task);
  } catch (err) {
    if (err === db_contr.taskErrorNotFound) return res.status(404).send(err.message);
    res.status(400).send(err.message);
  }
};

let searchByCategory = async (req, res) => {
  try {
    let { categ_searched } = req.query;

    let task = await db_contr.getTaskByCategory(categ_searched);

    res.status(200).send(task);
  } catch (err) {
    if(err.message === "Category Not Found") return res.status(404).send(err.message);
    res.status(400).send(err.message);
  }
};

let updateTask = async (req, res) => {
  try {
    let task = await db_contr.filterRequest(req.body, req.query.id);

    res.status(200).send(task);
  } catch (err) {
    if (err === db_contr.taskErrorNotFound) return res.status(404).send(err.message);
    res.status(400).send(err.message);
  }
};

let destroyByPk = async (req, res) =>{
  try {
    let destroyId = req.query.id

    let status = await db_contr.deleteById(destroyId);

    if (status) return res.status(200).send("Task deleted successfully");
    throw db_contr.taskErrorNotFound;

  } catch (err) {
    if (err === db_contr.taskErrorNotFound) return res.status(404).send(err.message);
    res.status(400).send(err.message);
  }
};

module.exports = {
  allTasks,
  createNewTask,
  searchByPk,
  searchByCategory,
  updateTask,
  destroyByPk
};
