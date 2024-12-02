const taskStorage = require("../storage");
const { Task } = require("../utils");

async function createTask(params) {
  const existingTaskData = taskStorage.readTaskData();
  const latestTaskId = existingTaskData.latestTaskId;
  const newTaskId = latestTaskId + 1;
  const task = new Task(newTaskId, params.title, params.description);
  existingTaskData.list.push(task);
  existingTaskData.latestTaskId = newTaskId;
  taskStorage.writeTaskData(existingTaskData);
  return task;
}

async function getTasks(params) {
  return params;
}

async function updateTask(params) {
  return params;
}

async function deleteTask(params) {
  return params;
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
