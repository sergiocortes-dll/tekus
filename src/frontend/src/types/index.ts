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
  countries: number[];
  countryObjects?: Country[]
}

export interface Country {
  id: number;
  name: string;
  services?: Service[];
}

export interface SummaryItem {
  countryId: number;
  countryName: string;
  count: number;
}

export interface SummaryData {
  providersPerCountry: SummaryItem[];
  servicesPerCountry: SummaryItem[];
}

export interface PaginationParams {
    pageNumber?: number;
    pageSize?: number;
    search?: string;
    searchField?: string;
    sort?: string;
    sortDirection?: "asc" | "desc";
}

export interface PagedServicesResponse {
    data: Service[];
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
}

export interface PagedProvidersResponse {
    data: Provider[];
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
}