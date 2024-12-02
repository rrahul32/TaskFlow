const taskStorage = require("../storage");
const { Task, taskStatus } = require("../utils");

function validateTaskStatus(status) {
  if (status === taskStatus.completed || status === taskStatus.pending) {
    return null;
  }
  return "Invalid task status";
}

function validateTaskDetails(task) {
  if (!task.title) {
    return "Task title should not be empty";
  }
  if (typeof task.title !== "string") {
    return "Task title should be a string";
  }
  if (!task.description) {
    return "Task description should not be empty";
  }
  if (typeof task.description !== "string") {
    return "Task description should be a string";
  }
  return validateTaskStatus(task.status);
}

function createTask(params) {
  const existingTaskData = taskStorage.readTaskData();
  const latestTaskId = existingTaskData.latestTaskId;
  const newTaskId = latestTaskId + 1;
  const task = new Task(newTaskId, params.title, params.description);
  const error = validateTaskDetails(task);
  if (error) {
    return {
      status: 400,
      result: { error },
    };
  }
  existingTaskData.list.push(task);
  existingTaskData.latestTaskId = newTaskId;
  taskStorage.writeTaskData(existingTaskData);
  return {
    status: 201,
    result: { message: "Task created successfully.", task },
  };
}

function getTasks(status) {
  const { list } = taskStorage.readTaskData();
  if (status) {
    const error = validateTaskStatus(status);
    if (error) {
      return {
        status: 400,
        result: { error },
      };
    }
    return {
      status: 200,
      result: list.filter((task) => task.status === status),
    };
  }
  return { status: 200, result: list };
}

function updateTask(id, status) {
  const taskId = Number(id);
  if (!taskId) {
    return {
      status: 400,
      error: "Invalid task ID.",
    };
  }
  const error = validateTaskStatus(status);
  if (error) {
    return {
      status: 400,
      error,
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
