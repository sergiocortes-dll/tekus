import { getCountries } from '@/services';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import * as React from 'react';
import { type Provider } from '../../../types';

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200},
]

export default function Countries() {
  const [countries, setCountries] = React.useState<Provider[]>([]);


  React.useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    fetchCountries();
  }, [])

  return (
    <div>
      <DataGrid rows={countries} columns={columns} />
    </div>
  );
}
