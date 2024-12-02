const tasksService = require("./service");

async function createTask(req, res) {
  const result = await tasksService.createTask(req.body);
  res.json(result);
}

async function getAllTasks(req, res) {
  const result = await tasksService.getTasks();
  res.json(result);
}

async function updateTask(req, res) {
  const { id } = req.params;
  const result = await tasksService.updateTask(id.req.body);
  res.json(result);
}

async function deleteTask(req, res) {
  const { id } = req.params;
  const result = await tasksService.deleteTask(id);
  res.json(result);
}

async function getFilteredTasks(req, res) {
  const { status } = req.params;
  const result = await tasksService.getTasks(status);
  res.json(result);
}

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getFilteredTasks,
};
