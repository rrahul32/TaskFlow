const taskStatus = {
  pending: "pending",
  completed: "completed",
};

class Task {
  id;
  title;
  description;
  status;

  constructor(id, title, description, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status || taskStatus.pending;
  }
}

module.exports = {
  Task,
  taskStatus,
};
