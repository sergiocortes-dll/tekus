import { getProviders } from '@/services';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import * as React from 'react';
import { type Provider } from '../../../types';

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "nit", headerName: "NIT", width: 150 },
  { field: "name", headerName: "Name", width: 200},
  { field: "email", headerName: "Email", width: 200 },
]

export default function Providers() {
  const [providers, setProviders] = React.useState<Provider[]>([]);

  React.useEffect(() => {
    const fetchProviders = async () => {
      const data = await getProviders();
      setProviders(data);
    };
    fetchProviders();
  }, [])

  return (
    <div>
      <DataGrid rows={providers} columns={columns}/>
    </div>
  )
}
