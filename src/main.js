//handle setupevents as quickly as possible
const setupEvents = require('../installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

const electron = require('electron');
const url = require('url');
const path = require('path');

const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = electron;

// SET ENV
// process.env.NODE_ENV = 'production';

let mainWindow;
let calendarWindow;

// Listen for app to be ready
app.on('ready', function () {
    // Create new window
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800
    });
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));
    mainWindow.on('close', () => {
        app.quit();
    });
    // Quit app when closed
    app.on('close', () => {
        app.quit();
    });
    // Build menu for template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    if (process.env.NODE_ENV !== 'production') {
        Menu.setApplicationMenu(mainMenu);
    } else if (process.env.NODE_ENV === 'production') {
        Menu.setApplicationMenu(null);
    }
});

// Handle create add window
function createCalendarWindow() {
    // Create new window
    calendarWindow = new BrowserWindow({
        width: 810,
        height: 735,
        frame: true,
        titleBarStyle: 'hidden'
    });
    // Load html into window
    calendarWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'calendarWindow.html'),
        protocol: 'file',
        slashes: true
    }));
    // Garbage collection handle
    calendarWindow.on('close', () => {
        calendarWindow = null;
    });
}

// Catch room:id
ipcMain.on('room:id', (e, item) => {
    createCalendarWindow();
    calendarWindow.webContents.on('did-finish-load', () => {
        calendarWindow.webContents.send('room:id', item);
    });
});

// Create menu template
const mainMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q', // for Macbook / Windows
        click() {
            app.quit();
        }
    }]
}];

// IF mac, add empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// Add developer tools item if not in production
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [{
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I', // for Macbook / Windows
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}