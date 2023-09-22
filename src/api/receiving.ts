import server from "./_server";
import type { IReceiving } from "@types";

const RECEIVINGS_BASEPATH = 'receivings';


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