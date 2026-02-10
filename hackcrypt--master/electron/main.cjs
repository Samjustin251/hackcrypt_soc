const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

function createWindow() {
    const win = new BrowserWindow({
        width: 1600,
        height: 900,
        backgroundColor: '#050505',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.cjs')
        },
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#050505',
            symbolColor: '#00f0ff',
            height: 35
        },
        show: false // Don't show until ready
    });

    // Smooth appearance
    win.once('ready-to-show', () => {
        win.show();
    });

    if (isDev) {
        win.loadURL('http://localhost:5173');
        // win.webContents.openDevTools({ mode: 'detach' }); // Optional: auto open devtools
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
