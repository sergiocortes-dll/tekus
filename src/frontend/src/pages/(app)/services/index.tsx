import { DataGrid, type GridColDef, type GridPaginationModel, type GridFilterModel   } from "@mui/x-data-grid";
import * as React from "react";
import { getServices  } from "@/services";
import { type Service, type PagedServicesResponse } from "@/types";
import {Link, useNavigate} from "react-router";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "hourlyRateUSD", headerName: "Hourly Rate USD", align: "right", width: 150 },
    { field: "providerId", headerName: "ID Proveedor", align: "right", width: 120 },
    { field: "providerName", headerName: "Provider", width: 200 }
];

export default function Services() {
    const navigate = useNavigate();
    const [services, setServices] = React.useState<Service[]>([]);
    const [rowCount, setRowCount] = React.useState(0);
    const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
        page: 0,
        pageSize: 10
    });
    
    const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
        items: []
    });

    const fetchServices = async () => {
        const filterItem = filterModel.items[0];
        const searchField = filterItem?.field || "";
        const searchValue = filterItem?.value || "";

        const result: PagedServicesResponse = await getServices({
            pageNumber: paginationModel.page + 1,
            pageSize: paginationModel.pageSize,
            search: searchValue,
            searchField: searchField
        });

        setServices(result.data);
        setRowCount(result.totalRecords);
    };

    React.useEffect(() => {
        fetchServices();
    }, [paginationModel, filterModel]);

    return (
        <Box sx={{ display: 'flex', flexFlow: 'column', width: "100%", gap: 2 }}>
            <Button component={Link} to="/app/services/new" variant="contained" sx={{ width: 'max-content'}} startIcon={<Add />}>
                Add Service
            </Button>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={services}
                    columns={columns}
                    pagination
                    paginationMode="server"
                    rowCount={rowCount}
                    paginationModel={paginationModel}
                    onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
                    filterMode="server"
                    onRowClick={() => {
                        if (!localStorage.getItem("dc_help")) {
                            alert("If you want check details, double click.")
                            localStorage.setItem("dc_help", "true");
                        }
                    }}
                    onRowDoubleClick={(params) => navigate(`/app/services/${params.row.id}`)}
                    filterModel={filterModel}
                    onFilterModelChange={(newModel) => setFilterModel(newModel)}
                />
            </div>
        </Box>
    );
}
