import server from "./_server";
import type { IClient } from "@types";

const CLIENTS_BASEPATH = "clients";


export const getClients = () => server.get<IClient[]>(CLIENTS_BASEPATH);

export const createClient = (client: Omit<IClient, '_id' | 'isHidden'>) => server.post<string>(CLIENTS_BASEPATH, client);

export const restoreClient = (clientName: string) => server.put(`${CLIENTS_BASEPATH}/restore/`, { name: clientName });

export const updateClient = (client: Omit<IClient, 'isHidden'>) => server.put<string>(CLIENTS_BASEPATH, {
  id: client._id,
  name: client.name,
  note: client.note
});

export const deleteClient = (id: string) => server.delete(`${CLIENTS_BASEPATH}/${id}`);
