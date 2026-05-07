const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const DATA_FILE = path.join(__dirname, 'data', 'foods.json');

function ensureDataFile() {
  const dir = path.join(__dirname, 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    const seedPath = path.join(__dirname, 'data', 'foods.json');
    const seed = fs.readFileSync(seedPath, 'utf-8');
    fs.writeFileSync(DATA_FILE, seed);
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 680,
    minWidth: 720,
    minHeight: 560,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  ensureDataFile();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC: read foods
ipcMain.handle('foods:read', () => {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
});

// IPC: write foods (full list)
ipcMain.handle('foods:write', (_event, foods) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(foods, null, 2));
  return true;
});
