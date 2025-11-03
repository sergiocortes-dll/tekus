import { getSummary } from '@/services';
import type { SummaryData } from '@/types';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import * as React from 'react';

export default function Summary() {
  const [summary, setSummary] = React.useState<SummaryData>({
    providersPerCountry: [],
    servicesPerCountry: [],
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getSummary(); // Llama al endpoint /summary con auth headers
        setSummary(data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const columns: GridColDef[] = [
    { field: 'countryId', headerName: 'ID País', width: 150 },
    { field: 'countryName', headerName: "País", width: 200 },
    { field: 'count', headerName: 'Cantidad', width: 150 },
  ];

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box >
      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>

      <Box sx={{ display: 'flex', gap: 4}}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Proveedores por País
            </Typography>
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                rows={summary.providersPerCountry}
                columns={columns}
                pageSizeOptions={[5, 10]}
                autoHeight
                getRowId={(row) => row.countryId} // Usa countryId como ID único
              />
            </div>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1}}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Servicios por País
            </Typography>
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                rows={summary.servicesPerCountry}
                columns={columns}
                pageSizeOptions={[5, 10]}
                autoHeight
                getRowId={(row) => row.countryId}
              />
            </div>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
