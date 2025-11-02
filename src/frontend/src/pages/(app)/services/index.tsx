import { getServices } from '@/services';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import * as React from 'react';
import { type Provider } from '../../../types';

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200},
  { field: "hourlyRateUSD", headerName: "Hourly Rate USD", align: 'right'},
  { field: "providerId", headerName: "ID Proveedor", align: "right" }
]

export default function Services() {
  const [services, setServices] = React.useState<Provider[]>([]);


  React.useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServices(data);
    };
    fetchServices();
  }, [])

  return (
    <div>
      <DataGrid rows={services} columns={columns} />
    </div>
  );
}
