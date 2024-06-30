const { parentPort, workerData } = require('worker_threads');
const { generateHTMLTemplate } = require('./src/utils/codeGeneration');

const code = generateHTMLTemplate(workerData);
parentPort.postMessage(code);