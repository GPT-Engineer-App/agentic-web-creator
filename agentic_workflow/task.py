import logging

class Task:
    def __init__(self, task_id, description):
        self.task_id = task_id
        self.description = description
        logging.info(f"Task {self.task_id} created with description: {self.description}")

class TaskQueue:
    def __init__(self):
        self.queue = []
        logging.info("TaskQueue initialized")

    def add_task(self, task):
        self.queue.append(task)
        logging.info(f"Task {task.task_id} added to TaskQueue")

    def get_task(self):
        if self.queue:
            task = self.queue.pop(0)
            logging.info(f"Task {task.task_id} retrieved from TaskQueue")
            return task
        else:
            logging.info("No tasks in TaskQueue")
            return None