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
  return { message: "Task created successfully.", task };
}

function getTasks(status) {
  const { list } = taskStorage.readTaskData();
  if (status) {
    return list.filter((task) => task.status === status);
  }
  return list;
}

function updateTask(id, status) {
  const taskId = Number(id);
  if (!taskId) {
    return {
      status: 400,
      error: "Invalid task ID.",
    };
  }
  const taskData = taskStorage.readTaskData();
  const task = taskData.list.find((item) => item.id === taskId);
  if (!task) {
    return {
      status: 404,
      error: "Task not found.",
    };
  }
  task.status = status;
  taskStorage.writeTaskData(taskData);
  return {
    message: "Task updated successfully.",
    task,
    status: 200,
  };
}

function deleteTask(id) {
  const taskId = Number(id);
  if (!taskId) {
    return {
      status: 400,
      error: "Invalid task ID.",
    };
  }
  const taskData = taskStorage.readTaskData();
  const taskIndex = taskData.list.findIndex((item) => item.id === taskId);
  if (taskIndex === -1) {
    return {
      status: 404,
      error: "Task not found.",
    };
  }
  taskData.list.splice(taskIndex, 1);
  taskStorage.writeTaskData(taskData);
  return {
    status: 200,
    message: "Task deleted successfully",
  };
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
