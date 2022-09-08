import axios from "axios";
import { IClient, IOwnReceiving, IReceiving } from "@types";

const server = axios.create({
  baseURL: 'http://localhost:3119',
  responseType: 'json'
});

const CLIENTS_BASEPATH = 'clients';
const OWN_RECEIVINGS_BASEPATH = 'own_receivings';
const RECEIVINGS_BASEPATH = 'receivings';

export const getClients = () => server.get<IClient[]>(CLIENTS_BASEPATH);

export const createClient = (client: Omit<IClient, '_id'>) => server.post<string>(CLIENTS_BASEPATH, client);

export const updateClient = (client: IClient) => server.put<string>(CLIENTS_BASEPATH, {
  id: client._id,
  name: client.name,
  note: client.note
});

export const deleteClient = (id: string) => server.delete(`${CLIENTS_BASEPATH}/${id}`);

export const getOwnReceivings = () => server.get<IOwnReceiving[]>(OWN_RECEIVINGS_BASEPATH);

export const createOwnReceiving = (receiving: Omit<IOwnReceiving, '_id'>) => server.post<IOwnReceiving>(OWN_RECEIVINGS_BASEPATH, receiving);

export const updateOwnReceiving = (receiving: IOwnReceiving) => server.put<IOwnReceiving>(OWN_RECEIVINGS_BASEPATH, {
  id: receiving._id,
  newData: {
    weight: receiving.weight,
    timestamp: receiving.timestamp
  }
});

export const deleteOwnReceiving = (id: string) => server.delete<IOwnReceiving>(`${OWN_RECEIVINGS_BASEPATH}/${id}`);

export const getReceivings = () => server.get<IReceiving[]>(RECEIVINGS_BASEPATH);
