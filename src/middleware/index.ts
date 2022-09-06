import axios from "axios";
import { IClient } from "@types";

const server = axios.create({
  baseURL: 'http://localhost:3119',
  responseType: 'json'
});

export const getClients = () => server.get<IClient[]>('clients');

export const createClient = (client: Omit<IClient, '_id'>) => server.post<string>('clients', client);

export const updateClient = (client: IClient) => server.put<string>('clients', {
  id: client._id,
  name: client.name,
  note: client.note
});

export const deleteClient = (id: string) => server.delete(`clients/${id}`);