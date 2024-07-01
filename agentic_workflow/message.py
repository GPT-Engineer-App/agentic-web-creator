import logging

class Message:
    def __init__(self, sender_id, receiver_id, content):
        self.sender_id = sender_id
        self.receiver_id = receiver_id
        self.content = content
        logging.info(f"Message from {self.sender_id} to {self.receiver_id}: {self.content}")

class MessageBus:
    def __init__(self):
        self.messages = []
        logging.info("MessageBus initialized")

    def send_message(self, message):
        self.messages.append(message)
        logging.info(f"Message sent from {message.sender_id} to {message.receiver_id}")

    def receive_messages(self, receiver_id):
        received_messages = [msg for msg in self.messages if msg.receiver_id == receiver_id]
        self.messages = [msg for msg in self.messages if msg.receiver_id != receiver_id]
        logging.info(f"Messages received for {receiver_id}: {received_messages}")
        return received_messages