const fs = require('fs');
const path = require('path');

const modelsDir = './models';
const outputFile = './models.json';

// Ensure the directory exists
if (!fs.existsSync(modelsDir)) {
    console.error("Models directory not found!");
    process.exit(1);
}

const files = fs.readdirSync(modelsDir);

// Find all USDZ files and assume a matching GLB exists
const modelList = files
  .filter(file => path.extname(file).toLowerCase() === '.usdz')
  .map(file => {
    const fileName = path.parse(file).name;
    return {
      name: fileName.replace(/_/g, ' ').replace(/-/g, ' '), // Clean up name
      file: fileName
    };
  });

fs.writeFileSync(outputFile, JSON.stringify(modelList, null, 2));
console.log(`Success: Found ${modelList.length} models.`);
