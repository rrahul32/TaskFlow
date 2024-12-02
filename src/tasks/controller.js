const tasksService = require("./service");

function createTask(req, res) {
  const result = tasksService.createTask(req.body);
  res.status(201).json(result);
}

function getAllTasks(_, res) {
  const result = tasksService.getTasks();
  res.status(200).json(result);
}

function updateTask(req, res) {
  const { id } = req.params;
  const { status: taskStatus } = req.body;
  const { status, ...result } = tasksService.updateTask(id, taskStatus);
  res.status(status).json(result);
}

function deleteTask(req, res) {
  const { id } = req.params;
  const result = tasksService.deleteTask(id);
  res.json(result);
}

function getFilteredTasks(req, res) {
  const { status } = req.params;
  const result = tasksService.getTasks(status);
  res.json(result);
}

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getFilteredTasks,
};
