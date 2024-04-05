const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for the text:',
        validate: (input) => input.length <= 3 || 'Text must be up to three characters.'
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter a color keyword or a hexadecimal number for the text color:',
        validate: (input) => /^#?[0-9A-Fa-f]{6}$|^[\w]+$/.test(input) || 'Please enter a valid color keyword or hexadecimal number.'
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['circle', 'triangle', 'square']
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter a color keyword or a hexadecimal number for the shape\'s color:',
        validate: (input) => /^#?[0-9A-Fa-f]{6}$|^[\w]+$/.test(input) || 'Please enter a valid color keyword or hexadecimal number.'
    }
];

inquirer.prompt(questions).then((answers) => {
    const { text, textColor, shape, shapeColor } = answers;
    const svgContent = generateSVGContent(text, textColor, shape, shapeColor);
    fs.writeFileSync('logo.svg', svgContent);
    console.log('Generated logo.svg');
});

function generateSVGContent(text, textColor, shape, shapeColor) {
    // SVG template
    let shapeSVG = '';
    switch (shape) {
        case 'circle':
            shapeSVG = `<circle cx="150" cy="100" r="80" fill="${shapeColor}" />`;
            break;
        case 'triangle':
            // Add triangle SVG logic
            shapeSVG = `<polygon points="150,20 40,200 260,200" fill="${shapeColor}" />`;
            break;
        case 'square':
            // Add square SVG logic
            shapeSVG = `<rect x="70" y="50" width="160" height="160" fill="${shapeColor}" />`;
            break;
    }

    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">\n${shapeSVG}\n<text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>\n</svg>`;
}
