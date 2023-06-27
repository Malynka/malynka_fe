import axios from "axios";
import { IClient, IOwnReceiving, IReceiving, ISale, IStats } from "@types";

const server = axios.create({
  baseURL: 'http://localhost:3119',
  responseType: 'json'
});

const CLIENTS_BASEPATH = 'clients';
const OWN_RECEIVINGS_BASEPATH = 'own_receivings';
const RECEIVINGS_BASEPATH = 'receivings';
const RAPORT_BASEPATH = 'raport';
const SALE_BASEPATH = 'sales';

export const getClients = () => server.get<IClient[]>(CLIENTS_BASEPATH);

export const createClient = (client: Omit<IClient, '_id' | 'isHidden'>) => server.post<string>(CLIENTS_BASEPATH, client);

export const restoreClient = (clientName: string) => server.put(`${CLIENTS_BASEPATH}/restore/`, { name: clientName });

export const updateClient = (client: Omit<IClient, 'isHidden'>) => server.put<string>(CLIENTS_BASEPATH, {
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

export const getReceivingsByYear = (year: number) => server.get<IReceiving[]>(`${RECEIVINGS_BASEPATH}/year/${year}`);

export const createReceiving = (receiving: Pick<IReceiving, 'records' | 'timestamp'> & { client: string }) => server.post<IReceiving>(RECEIVINGS_BASEPATH, receiving);

export const updateReceiving = (receiving: Omit<IReceiving, 'client' | 'totalWeight' | 'totalPrice'> & { client: string }) => server.put<IReceiving>(RECEIVINGS_BASEPATH, {
  id: receiving._id,
  newData: {
    client: receiving.client,
    records: receiving.records,
    timestamp: receiving.timestamp,
  }
});

export const deleteReceiving = (id: string) => server.delete<IReceiving>(`${RECEIVINGS_BASEPATH}/${id}`);

export const getYears = () => server.get<number[]>(`${RAPORT_BASEPATH}/years`);

export const getStats = (year: number | '') => server.get<IStats>(`${RAPORT_BASEPATH}/stats/${year}`);

export const getReportByRange = (start: number, end?: number, client?: string) => server.get<Blob>(`${RAPORT_BASEPATH}/range`, {
  params: {
    start, end, client
  },
  responseType: 'blob'
});

export const getSalesByYear = (year: string = '') => server.get<ISale[]>(`${SALE_BASEPATH}/year/${year}`);

export const createSale = (sale: Omit<ISale, '_id'>) => server.post<ISale>(SALE_BASEPATH, sale);

export const updateSale = (sale: ISale) => server.put<ISale>(SALE_BASEPATH, {
  id: sale._id,
  newData: {
    weight: sale.weight,
    price: sale.price,
    timestamp: sale.timestamp
  }
});

export const deleteSale = (id: string) => server.delete<ISale>(`${SALE_BASEPATH}/${id}`);