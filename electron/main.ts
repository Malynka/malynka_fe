import { ipcMain, app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'node:path';
import type { UpdatingMessage, CommandRunMessage } from '@types';
import { spawn } from 'node:child_process';

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'Malynka',
  repo: 'malynka_fe'
});

const sentError = (when: string) => (error: any) => {
  new Promise((res) => setTimeout(res, 500)).then(() => {
    win?.webContents.send('update-message', {
      status: 'error',
      value: `${when} сталася помилка. Код помилки: ${error.message}`
    } as UpdatingMessage);
  });
};

const checkUpdates = () => {
  autoUpdater.checkForUpdates().catch(sentError('Під час перевірки наявності оновлень'));

  win?.webContents.send('update-message', {
    status: 'checking',
  } as UpdatingMessage);
};

ipcMain.handle('getAppVersion', () => {
  return app.getVersion();
})

ipcMain.handle('checkUpdates', checkUpdates);

ipcMain.handle('downloadUpdate', () => {
  autoUpdater.downloadUpdate().catch(sentError('Під час завантаження оновлень'));
});


ipcMain.handle('update', () => {
  autoUpdater.quitAndInstall(true, true);
})

interface IRunOptions {
  args?: string[];
}

async function run(type: 'file' | 'command', executable: string, { args = [] }: IRunOptions = {}) {
  return new Promise<number>((resolve, reject) => {
    const child = spawn(
      "powershell",
      [
        "-executionpolicy",
        "unrestricted",
        "-windowstyle",
        "hidden",
        ...args,
        `-${type === 'file' ? 'File' : 'Command'}`,
        executable
      ],
      {
        shell: true,
        stdio: ["pipe", process.stdout, process.stderr],
      }
    );
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        const e: Error & { code?: number | null } = new Error(
          "Process exited with error code " + code
        );
        e.code = code;
        reject(e);
      }
    });
  });
}

ipcMain.handle('make dump', async () => {
  try {
    await run('command', 'make_dump.ps1');
    win?.webContents.send('dump ended', {
      status: 'success',
      message: 'Резевна копія успішно збережена',
    } as CommandRunMessage);
  } catch(e: any) {
    win?.webContents.send('dump ended', {
      status: 'error',
      message: 'Під час сторення резервної копії даних сталася помилка',
    } as CommandRunMessage);
  }
});

ipcMain.handle('update server', async () => {
  try {
    win?.webContents.send('update server progress', 'Створення резервної копії...');
    await run('command', 'make_dump.ps1');

    win?.webContents.send('update server progress', 'Оновлення сервера...');
    await run('command', 'update_server.ps1');

    win?.webContents.send('update server progress', 'Перезапуск системної служби...');
    await run('command', 'restart_service.ps1');

    win?.webContents.send('update server ended', {
      status: 'success',
      message: 'Сервер успішно оновлено'
    } as CommandRunMessage);
  } catch(e: any) {
    win?.webContents.send('update server ended', {
      status: 'error',
      message: 'Під час оновлення серверу сталася помилка',
    } as CommandRunMessage);
  }
});


// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    height: 900,
    width: 1400,
    minHeight: 900,
    minWidth: 1400,
    icon: path.join(process.env.PUBLIC, 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString());

    checkUpdates();

    autoUpdater.on('update-not-available', () => {
      win?.webContents.send('update-message', {
        status: 'up-to-date',
      } as UpdatingMessage);
    });

    autoUpdater.on('update-available', (event) => {
      win?.webContents.send('update-message', {
        status: 'updatable',
        value: event.version
      } as UpdatingMessage);
    });

    autoUpdater.on('download-progress', (event) => {
      win?.webContents.send('update-message', {
        status: 'downloading',
        value: event.percent
      } as UpdatingMessage);
    });

    autoUpdater.on('update-downloaded', () => {
      win?.webContents.send('update-message', {
        status: 'downloaded'
      } as UpdatingMessage);
    });
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  app.quit();
})

app.whenReady().then(() => {
  createWindow();
});
