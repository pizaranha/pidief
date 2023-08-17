const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js') // Agrega esta línea
    }
  });

  mainWindow.loadFile('src/index.html');
}

app.on('ready', () => {
  createWindow();
});

ipcMain.on('open-pdf', (event, filePath) => {
  const pdfWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  pdfWindow.loadFile(filePath);
});
