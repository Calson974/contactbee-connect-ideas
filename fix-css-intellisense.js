const fs = require('fs');
const path = require('path');

// Create .vscode directory if it doesn't exist
const vscodeDir = path.join(__dirname, '.vscode');
if (!fs.existsSync(vscodeDir)) {
  fs.mkdirSync(vscodeDir);
  console.log('Created .vscode directory');
}

// Create settings.json
const settingsPath = path.join(vscodeDir, 'settings.json');
const settings = {
  "css.validate": false,
  "tailwindCSS.emmetCompletions": true,
  "editor.quickSuggestions": {
    "strings": true
  },
  "tailwindCSS.includeLanguages": {
    "plaintext": "html"
  }
};

fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
console.log('Created/updated .vscode/settings.json');

console.log('\n✅ CSS IntelliSense configuration complete!');
console.log('Please restart VS Code for the changes to take effect.');
