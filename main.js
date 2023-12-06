const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
    const win = new BrowserWindow({
      titleBarStyle: 'hidden',
      titleBarOverlay: true,
      width: 800,
      height: 600,
      webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }})
    // win.webContents.openDevTools()
    win.loadFile(path.join(__dirname, 'index.html'))
  }

  app.whenReady().then(() => {
    createWindow()
    //Untuk Mac os perlu melakukan create Window saat active
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
       createWindow()
      }
    })
  })

  app.on('window-all-closed', () => {
    //Selain macc os perlu memanggil method quit untuk benar benar close aplikasi
    if (process.platform !== 'darwin') {
        console.log(process.platform)
      app.quit()
    }
  })

console.warn("electron is running")