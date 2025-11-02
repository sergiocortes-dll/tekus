export interface Provider {
  id: number;
  nit: string;
  name: string;
  email: string;
  customFields?: string; // JSON
  services?: Service[]
}

export interface Service {
  id: number;
  name: string;
  hourlyRateUSD: number;
  providerId: number;
  countries?: Country[]
}

export interface Country {
  id: number;
  name: string;
  services?: Service[];
}
