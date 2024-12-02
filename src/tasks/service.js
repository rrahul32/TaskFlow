const taskStorage = require("../storage");
const { Task, taskStatus } = require("../utils");

/**
 * Check whether the status is a valid task status.
 * @param {string} status - The status to be validated.
 * @returns {string | null} Error message if there is a validation error or null otherwise.
 */
function validateTaskStatus(status) {
  if (status === taskStatus.completed || status === taskStatus.pending) {
    return null;
  }
  return "Invalid task status";
}

/**
 * Validates all the task fields except ID.
 * @param {Task} task - The task to be validated.
 * @returns {string | null} Error message if there is a validation error or null otherwise.
 */
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

/**
 * Creates a new task.
 * @param {{title:string; description:string}} params - The params to create task containing the task title and description.
 */
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

/**
 * Fetches all tasks or filtered tasks if status is provided.
 * @param {string} status - The optional status to filter tasks.
 */
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

/**
 * Updates a task status using its ID.
 * @param {string} id - The task ID.
 * @param {string} status - The status value to be updated to task.
 */
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

/**
 * Deletes a task using its ID.
 * @param {string} id - The ID of the task to be deleted.
 */
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
