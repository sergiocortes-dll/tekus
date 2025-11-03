import { getServicesByProvider } from '@/services';
import { type Service } from '@/types';
import { Box, CircularProgress, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import * as React from 'react';
import { useNavigate } from 'react-router';

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "hourlyRateUSD", headerName: "Hourly Rate USD", align: "right", width: 150 },
  { field: "providerId", headerName: "Provider ID", align: "right", width: 120 },
  { field: "providerName", headerName: "Provider", width: 200 }
];

export default function ServicesByProvider({id}: { id: number}) {
    const navigate = useNavigate();
    const [services, setServices] = React.useState<Service[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const fetchServices = async () => {
        try {
        setLoading(true);
        const data = await getServicesByProvider(id);
        setServices(data);
        } catch (err) {
        console.error("Error al obtener servicios del proveedor:", err);
        } finally {
        setLoading(false);
        }
    };

    React.useEffect(() => {
        if (id) fetchServices();
    }, [id]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
            <Typography variant="h6">Servicios del Proveedor #{id}</Typography>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}>
                <CircularProgress />
                </Box>
            ) : services.length === 0 ? (
                <Typography>No hay servicios para este proveedor.</Typography>
            ) : (
                <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={services}
                    columns={columns}
                    pageSizeOptions={[5, 10, 20]}
                    onRowDoubleClick={(params) => navigate(`/app/services/${params.row.id}`)}
                    onRowClick={() => {
                        if (!localStorage.getItem("dc_help")) {
                            alert("If you want check details, double click.")
                            localStorage.setItem("dc_help", "true");
                        }
                    }}
                />
                </div>
            )}
            </Box>
    );
}