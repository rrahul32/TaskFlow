const express = require("express");
const tasksController = require("./tasks/controller");

const app = express();
app.use(express.json());
const port = 3000;

const router = express.Router();

/**
 * Task routes
 */
router.route("/tasks").post(tasksController.createTask);
router.route("/tasks").get(tasksController.getAllTasks);
router.route("/tasks/:id").put(tasksController.updateTask);
router.route("/tasks/:id").delete(tasksController.deleteTask);
router.route("/tasks/status/:status").get(tasksController.getFilteredTasks);
/**
 * Task routes end
 */

app.use(router);

app.listen(port, () => {
  console.log(`TaskFlow backend listening on port ${port}`);
});
