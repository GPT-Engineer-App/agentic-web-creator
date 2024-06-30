const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const JSZip = require('jszip');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/process-description', (req, res) => {
  const { description } = req.body;
  // Process the description and generate code (mocked for now)
  const generatedHTML = '<!DOCTYPE html><html><head><title>Generated Web App</title></head><body><h1>Hello World</h1></body></html>';
  const generatedCSS = 'body { font-family: Arial, sans-serif; }';
  const generatedJS = 'console.log("Hello World");';
  const generatedBackend = 'const express = require("express"); const app = express(); app.get("/", (req, res) => res.send("Hello World")); app.listen(3000, () => console.log("Server running on port 3000"));';

  res.json({ generatedHTML, generatedCSS, generatedJS, generatedBackend });
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