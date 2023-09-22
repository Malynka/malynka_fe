import server from "./_server";
import type { IStats } from "@types";

const RAPORT_BASEPATH = 'raport';


export const getYears = () => server.get<number[]>(`${RAPORT_BASEPATH}/years`);

export const getStats = (year: number | '') => server.get<IStats>(`${RAPORT_BASEPATH}/stats/${year}`);

export const getReportByRange = (start: number, end?: number, client?: string) => server.get<Blob>(`${RAPORT_BASEPATH}/range`, {
  params: {
    start, end, client
  },
  responseType: 'blob'
});
