import logging

class Agent:
    def __init__(self, agent_id, capabilities):
        self.agent_id = agent_id
        self.capabilities = capabilities
        self.state = "idle"
        logging.info(f"Agent {self.agent_id} initialized with capabilities: {self.capabilities}")

    def perform_task(self, task):
        try:
            logging.info(f"Agent {self.agent_id} performing task: {task}")
            # Implement task execution logic here
            self.state = "busy"
            # Simulate task completion
            self.state = "idle"
            logging.info(f"Agent {self.agent_id} completed task: {task}")
        except Exception as e:
            logging.error(f"Error performing task {task} by agent {self.agent_id}: {e}")
            self.state = "error"

class AgentManager:
    def __init__(self):
        self.agents = {}
        logging.info("AgentManager initialized")

    def add_agent(self, agent):
        self.agents[agent.agent_id] = agent
        logging.info(f"Agent {agent.agent_id} added to AgentManager")

    def get_agent(self, agent_id):
        return self.agents.get(agent_id)

    def remove_agent(self, agent_id):
        if agent_id in self.agents:
            del self.agents[agent_id]
            logging.info(f"Agent {agent_id} removed from AgentManager")