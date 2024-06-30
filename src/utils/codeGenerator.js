import Handlebars from 'handlebars';
import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import JSZip from 'jszip';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function generateCode(parsedUserInput) {
  const htmlTemplate = generateHTMLTemplate(parsedUserInput);
  const cssStyles = generateTailwindStyles(parsedUserInput.design);
  const jsInteractivity = await generateCodexJavaScript(parsedUserInput.features);
  const backendCode = generateExpressServer(parsedUserInput.technicalRequirements);

  return { htmlTemplate, cssStyles, jsInteractivity, backendCode };
}

function generateHTMLTemplate(parsedUserInput) {
  const template = Handlebars.compile(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>{{title}}</title>
      <link href="styles.css" rel="stylesheet">
    </head>
    <body>
      {{#each features}}
        <div class="feature">{{this}}</div>
      {{/each}}
      <script src="script.js"></script>
    </body>
    </html>
  `);
  return template(parsedUserInput);
}

function generateTailwindStyles(design) {
  // Example: Generate Tailwind CSS based on design preferences
  return `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    body {
      @apply bg-${design.backgroundColor} text-${design.textColor};
    }
  `;
}

async function generateCodexJavaScript(features) {
  const prompt = `
    Generate JavaScript code for the following features:
    ${features.join(', ')}

    The code should be modular and use modern JavaScript practices.
  `;

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 150,
  });

  return completion.data.choices[0].text.trim();
}

function generateExpressServer(technicalRequirements) {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  // Add more routes based on technical requirements
  technicalRequirements.forEach(req => {
    app[req.method](req.route, (req, res) => {
      res.send(req.response);
    });
  });

  return app;
}

export async function createZipFile(generatedCode) {
  const zip = new JSZip();
  zip.file("index.html", generatedCode.htmlTemplate);
  zip.file("styles.css", generatedCode.cssStyles);
  zip.file("script.js", generatedCode.jsInteractivity);
  zip.file("server.js", generatedCode.backendCode);

  return zip.generateAsync({ type: "nodebuffer" });
}