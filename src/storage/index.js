const fs = require("fs");
const path = require("path");

// Path to the tasks file
const tasksFilePath = path.join(__dirname, "tasks.json");

const initialData = {
  latestTaskId: 0,
  list: [],
};

/**
 * Reads the task data from file
 * @returns the stored tasks
 */
const readTaskData = () => {
  //create an empty file if it doesn't exists
  if (!fs.existsSync(tasksFilePath)) {
    fs.writeFileSync(
      tasksFilePath,
      JSON.stringify(initialData, null, 2),
      "utf8"
    );
  }
  const data = fs.readFileSync(tasksFilePath, "utf8");
  return JSON.parse(data);
};

/**
 * Writes task data to file.
 * @param taskData - The task data to be stored.
 */
const writeTaskData = (taskData) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(taskData, null, 2), "utf8");
};

module.exports = {
  readTaskData,
  writeTaskData,
};
