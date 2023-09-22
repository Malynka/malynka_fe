
export interface IClient {
  _id: string;
  name: string;
  note: string;
  isHidden: boolean;
}

export interface IOwnReceiving {
  _id: string;
  weight: number;
  timestamp: number;
}

export interface IReceiving {
  _id: string;
  client: IClient;
  records: {
    weight: number;
    price: number;
  }[];
  timestamp: number;
  totalWeight: number;
  totalPrice: number;
}

export interface IStats {
  totalWeight: number;
  totalPrice: number;
  soldWeight: number;
  earned: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
}

export interface ISale {
  _id: string;
  weight: number;
  price: number;
  timestamp: number;
}

export type UpdatingMessage = {
  status: 'init' | 'downloaded' | 'checking' | 'up-to-date'
} | {
  status: 'downloading';
  value: number;
} | {
  status: 'error' | 'updatable',
  value: string;
};

export type DumpingMessage = {
  status: 'success' | 'error',
  message: string;
  code: number;
};