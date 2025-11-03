import { getProviders } from '@/services';
import { DataGrid, type GridColDef, type GridPaginationModel, type GridFilterModel } from '@mui/x-data-grid';
import * as React from 'react';
import { type Provider, type PagedProvidersResponse } from '../../../types';
import { Link, useNavigate } from 'react-router';
import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nit", headerName: "NIT", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
];

export default function Providers() {
    const navigate = useNavigate();
    const [providers, setProviders] = React.useState<Provider[]>([]);
    const [rowCount, setRowCount] = React.useState(0);

    const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });

    const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
        items: [],
    });

    const fetchProviders = async () => {
        const filterItem = filterModel.items[0];
        const searchField = filterItem?.field || "";
        const searchValue = filterItem?.value || "";

        const result: PagedProvidersResponse = await getProviders({
            pageNumber: paginationModel.page + 1,
            pageSize: paginationModel.pageSize,
            search: searchValue,
            searchField: searchField,
        });

        setProviders(result.data);
        setRowCount(result.totalRecords);
    };

    React.useEffect(() => {
        fetchProviders();
    }, [paginationModel, filterModel]);

    return (
        <Box sx={{ display: 'flex', flexFlow: 'column', width: "100%", gap: 2 }}>
            <Button component={Link} to="/app/providers/new" variant="contained" sx={{ width: 'max-content'}} startIcon={<Add />}>
                Add Provider
            </Button>
            <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={providers}
                    columns={columns}
                    pagination
                    paginationMode="server"
                    rowCount={rowCount}
                    paginationModel={paginationModel}
                    onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
                    filterMode="server"
                    filterModel={filterModel}
                    onFilterModelChange={(newModel) => setFilterModel(newModel)}
                    onRowDoubleClick={(params) => navigate(`/app/providers/${params.row.id}`)}
                />
            </div>
        </Box>
    );
}
