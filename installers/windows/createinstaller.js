const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });

function getInstallerConfig () {
  console.log('creating windows installer');
  const rootPath = path.join('./');
  const outPath = path.join(rootPath, 'release-builds');

  return Promise.resolve({
    appDirectory: path.join(outPath, 'GHM-win32-x64/'),
    authors: 'A A',
    noMsi: true,
    outputDirectory: path.join(outPath, 'installers/windows/'),
    exe: 'GHM.exe',
    setupExe: 'GHM-Installer.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'Saki-Snowish-Install.ico')
  });
}