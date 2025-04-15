const fs = require('fs');

const indexPath = './dist/atom-ui/index.html';

fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading index.html:', err);
    return;
  }

  const updatedData = data.replace(/type="module"/g, 'defer');

  fs.writeFile(indexPath, updatedData, 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing to index.html:', writeErr);
    } else {
      console.log('HotFix For Angular Crestron: Successfully replaced type="module" with defer in index.html');
    }
  });
});
