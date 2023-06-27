import { useState, useEffect, useCallback } from "react";
import { ipcRenderer } from "electron";
import type { IpcRendererEvent } from "electron";
import type { UpdatingMessage } from "@types";
import { Body } from "@typography";
import { Button, DownloadProgress } from "./styles";

const buttonText: Record<UpdatingMessage['status'], string | undefined> = {
  'init': undefined,
  'checking': 'Триває перевірка',
  'updatable': 'Оновити',
  'downloaded': 'Встановити оновлення',
  'downloading': 'Завантажується',
  'error': 'Не вдалося перевірити оновлення',
  'up-to-date': undefined
};

const checkUpdates = () => {
  ipcRenderer.invoke('checkUpdates')
};

const downloadUpdate = () => {
  ipcRenderer.invoke('downloadUpdate');
};

const update = () => {
  ipcRenderer.invoke('update');
}



const buttonClickFunctions: Record<UpdatingMessage['status'], (() => void) | undefined> = {
  'init': checkUpdates,
  'checking': undefined,
  'updatable': downloadUpdate,
  'downloading': undefined,
  'downloaded': update,
  'error': checkUpdates, 
  'up-to-date': undefined
};


const AppUpdateControl = () => {
  const [message, setMessage] = useState<UpdatingMessage>({
    status: 'init'
  });

  const updateMessageCallback = useCallback((_: IpcRendererEvent, m: UpdatingMessage) => {
    setMessage(m);
  }, []);

  useEffect(() => {
    ipcRenderer.on('update-message', updateMessageCallback);

    return () => {
      ipcRenderer.off('update-message', updateMessageCallback);
    };
  }, [updateMessageCallback]);

  const text = message.status === 'downloading' ? `${message.value}%` : buttonText[message.status];

  if (!text) {
    return null;
  }

  return (
      <Button message={message} onClick={buttonClickFunctions[message.status]}>
        <Body>{text} {message.status === 'updatable' && ` (v${message.value})`}</Body>
        {['downloading', 'downloaded'].includes(message.status) && <DownloadProgress progress={message.status === 'downloading' ? message.value : 100} />}
      </Button>
  );
};
export default AppUpdateControl;