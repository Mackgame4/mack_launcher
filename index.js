const { app, BrowserWindow, Notification } = require('electron')

function showNotification () {
  const notification = {
    title: 'Mack Launcher',
    icon: __dirname + '/logo.ico',
    body: 'Welcome to Mack Roleplay, if launcher doesnt work contact us in: discord.io/mack'
  }
  new Notification(notification).show()
}

function createWindow () {
  const win = new BrowserWindow({
    width: 913,
    height: 510,
    resizable: false,
    frame: false,
    icon: __dirname + '/logo.ico',
    backgroundColor: '#14171c',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow).then(showNotification)

app.setAppUserModelId("Mack Launcher");

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})