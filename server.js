const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const JSZip = require('jszip');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const Joi = require('joi');
const redis = require('redis');
const { Worker } = require('worker_threads');

const app = express();
const port = process.env.PORT || 3000;
const client = redis.createClient();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(csrf({ cookie: true }));

async function getCachedCode(key) {
  return new Promise((resolve) => {
    client.get(key, (err, data) => {
      resolve(data);
    });
  });
}

app.post('/api/process-description', async (req, res) => {
  const schema = Joi.object({
    description: Joi.string().min(10).max(1000).required(),
    template: Joi.string().valid('basic', 'ecommerce', 'blog').required()
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const cachedCode = await getCachedCode(value.description);
  if (cachedCode) {
    return res.json({ code: cachedCode });
  }

  const worker = new Worker('./worker.js', { workerData: value });
  worker.on('message', (code) => {
    client.set(value.description, code);
    res.json({ code });
  });
  worker.on('error', (err) => {
    res.status(500).json({ error: 'Code generation failed' });
  });
});

app.post('/api/submit-rating', (req, res) => {
  const { rating } = req.body;
  // Store rating in the database
  res.json({ message: 'Rating submitted successfully' });
});

app.get('/download', (req, res) => {
  const zip = new JSZip();
  const generatedHTML = '<!DOCTYPE html><html><head><title>Generated Web App</title></head><body><h1>Hello World</h1></body></html>';
  const generatedCSS = 'body { font-family: Arial, sans-serif; }';
  const generatedJS = 'console.log("Hello World");';
  const generatedBackend = 'const express = require("express"); const app = express(); app.get("/", (req, res) => res.send("Hello World")); app.listen(3000, () => console.log("Server running on port 3000"));';

  zip.file("index.html", generatedHTML);
  zip.file("styles.css", generatedCSS);
  zip.file("script.js", generatedJS);
  zip.file("server.js", generatedBackend);

  zip.generateAsync({ type: "nodebuffer" }).then((content) => {
    res.attachment('webapp.zip').send(content);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});