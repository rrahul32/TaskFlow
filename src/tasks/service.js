const taskStorage = require("../storage");
const { Task } = require("../utils");

function createTask(params) {
  const existingTaskData = taskStorage.readTaskData();
  const latestTaskId = existingTaskData.latestTaskId;
  const newTaskId = latestTaskId + 1;
  const task = new Task(newTaskId, params.title, params.description);
  existingTaskData.list.push(task);
  existingTaskData.latestTaskId = newTaskId;
  taskStorage.writeTaskData(existingTaskData);
  return task;
}

function getTasks(status) {
  const { list } = taskStorage.readTaskData();
  if (status) {
    return list.filter((task) => task.status === status);
  }
  return list;
}

function updateTask(params) {
  return params;
}

function deleteTask(params) {
  return params;
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
