import logging

class Workflow:
    def __init__(self, workflow_id, tasks):
        self.workflow_id = workflow_id
        self.tasks = tasks
        logging.info(f"Workflow {self.workflow_id} created with tasks: {self.tasks}")

class WorkflowOrchestrator:
    def __init__(self, agent_manager, task_queue):
        self.agent_manager = agent_manager
        self.task_queue = task_queue
        logging.info("WorkflowOrchestrator initialized")

    def execute_workflow(self, workflow):
        logging.info(f"Executing workflow {workflow.workflow_id}")
        for task in workflow.tasks:
            self.task_queue.add_task(task)
            agent = self.agent_manager.get_agent(task.task_id)  # Simplified agent selection
            if agent:
                agent.perform_task(task)
            else:
                logging.error(f"No agent available for task {task.task_id}")