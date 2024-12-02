const tasksService = require("./service");

function createTask(req, res) {
  const { status, result } = tasksService.createTask(req.body);
  res.status(status).json(result);
}

function getAllTasks(_, res) {
  const { status, result } = tasksService.getTasks();
  res.status(status).json(result);
}

function updateTask(req, res) {
  const { id } = req.params;
  const { status: taskStatus } = req.body;
  const { status, ...result } = tasksService.updateTask(id, taskStatus);
  res.status(status).json(result);
}

function deleteTask(req, res) {
  const { id } = req.params;
  const { status, ...result } = tasksService.deleteTask(id);
  res.status(status).json(result);
}

function getFilteredTasks(req, res) {
  const { status: taskStatus } = req.params;
  const { status, result } = tasksService.getTasks(taskStatus);
  res.status(status).json(result);
}

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getFilteredTasks,
};
