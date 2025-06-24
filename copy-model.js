const fs = require('fs');
const path = require('path');

// Create the assets directory in public if it doesn't exist
const publicAssetsDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

// Copy the file
const sourceFile = path.join(__dirname, 'src', 'assets', 'Red Car.glb');
const destFile = path.join(publicAssetsDir, 'Red Car.glb');

try {
  fs.copyFileSync(sourceFile, destFile);
  console.log('Car model copied successfully to public/assets folder');
} catch (err) {
  console.error('Error copying file:', err);
}