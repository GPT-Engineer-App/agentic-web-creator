import logging
from agent import Agent, AgentManager
from task import Task, TaskQueue
from workflow import Workflow, WorkflowOrchestrator

# Initialize components
agent_manager = AgentManager()
task_queue = TaskQueue()
workflow_orchestrator = WorkflowOrchestrator(agent_manager, task_queue)

# Create agents
agent1 = Agent(agent_id="agent1", capabilities=["task1", "task2"])
agent_manager.add_agent(agent1)

# Create tasks
task1 = Task(task_id="task1", description="Perform task 1")
task2 = Task(task_id="task2", description="Perform task 2")

# Create workflow
workflow = Workflow(workflow_id="workflow1", tasks=[task1, task2])

# Execute workflow
workflow_orchestrator.execute_workflow(workflow)