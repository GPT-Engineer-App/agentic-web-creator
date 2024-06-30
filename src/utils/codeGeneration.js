function generateHTMLTemplate({ description, template }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${description}</title>
    </head>
    <body>
      <h1>${description}</h1>
      <p>Template: ${template}</p>
    </body>
    </html>
  `;
}

module.exports = { generateHTMLTemplate };