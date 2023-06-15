import { ipcRenderer } from "electron";

type Status = 'pending' | 'error' | 'success';

let status: Status = 'pending', version: string;

const getVersion =  () => {
  const fetching = ipcRenderer
    .invoke('getAppVersion')
    .then((success) => {
      status = 'success';
      version = success;
    })
    .catch((error) => {
      status = 'error';

      version = error;
    });
  
  return () => {
    if (status === 'pending') {
      throw fetching;
    }

    if (status === 'error') {
      throw version;
    }

    return version;
  };
};

const versionData = getVersion();

const AppVersion = () => <div>App Version: {versionData()}</div>;

export default AppVersion;