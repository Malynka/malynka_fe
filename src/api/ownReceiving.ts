import server from "./_server";
import type { IOwnReceiving } from "@types";

const OWN_RECEIVINGS_BASEPATH = 'own_receivings';


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