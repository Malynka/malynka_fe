import server from "./_server";
import { ISale } from "@types";

const SALE_BASEPATH = "sales";


export const getSalesByYear = (year = "") =>
  server.get<ISale[]>(`${SALE_BASEPATH}/year/${year}`);

export const createSale = (sale: Omit<ISale, "_id">) =>
  server.post<ISale>(SALE_BASEPATH, sale);

export const updateSale = (sale: ISale) =>
  server.put<ISale>(SALE_BASEPATH, {
    id: sale._id,
    newData: {
      weight: sale.weight,
      price: sale.price,
      timestamp: sale.timestamp,
    },
  });

export const deleteSale = (id: string) =>
  server.delete<ISale>(`${SALE_BASEPATH}/${id}`);
