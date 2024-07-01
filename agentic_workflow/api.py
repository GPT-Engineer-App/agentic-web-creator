import logging
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/submit_task', methods=['POST'])
def submit_task():
    data = request.json
    task_id = data.get('task_id')
    description = data.get('description')
    # Implement task submission logic here
    logging.info(f"Task {task_id} submitted with description: {description}")
    return jsonify({"status": "success", "task_id": task_id})

@app.route('/api/get_task_status', methods=['GET'])
def get_task_status():
    task_id = request.args.get('task_id')
    # Implement task status retrieval logic here
    logging.info(f"Status requested for task {task_id}")
    return jsonify({"status": "completed", "task_id": task_id})

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    app.run(debug=True)