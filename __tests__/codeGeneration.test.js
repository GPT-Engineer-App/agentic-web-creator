const { generateHTMLTemplate } = require('../src/utils/codeGeneration');

describe('Code Generation', () => {
  test('generates valid HTML', () => {
    const mockUserInput = {
      description: 'A simple web app',
      template: 'basic'
    };
    const result = generateHTMLTemplate(mockUserInput);
    expect(result).toContain('<!DOCTYPE html>');
  });
});