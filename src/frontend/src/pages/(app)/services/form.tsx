import { createService, getAllProviders, getCountries, getProviders, getServiceById, updateService } from "@/services";
import { Alert, Box, Button, Chip, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate, useParams } from "react-router";
import type { Country, Provider, Service } from "../../../types";

export default function ServiceForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [service, setService] = React.useState<Service>({
    id: 0,
    name: "",
    hourlyRateUSD: 0,
    providerId: 0,
    countries: [],
  });

  
  const [providers, setProviders] = React.useState<Provider[]>([]);
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [providersData, countriesData] = await Promise.all([
          getAllProviders(),
          getCountries()
        ]);
        
        setProviders(providersData);
        setCountries(countriesData);

        if (id) {
          const serviceData = await getServiceById(parseInt(id));

          const countryIds = serviceData.countries?.map((country: Country) => country.id) || [];
          setService({
            ...serviceData,
            countries: countryIds, 
            countryObjects: serviceData.countries
          });
        }
      } catch (err) {
        setError("Error loading initial data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

      try {
          if (!service.name.trim()) {
              setError("Service name is required.");
              return;
          }
          if (service.providerId === 0) {
              setError("Debe seleccionar un proveedor");
              return;
          }
          
          if (id) {
              await updateService(parseInt(id), service);
          } else {
              await createService(service);
          }
          navigate("/app/services");
      } catch (err: any) {
          if (err.response?.data) {
              setError(err.response.data.message || JSON.stringify(err.response.data));
          } else {
              setError("Error al guardar el servicio");
          }
      } finally {
          setLoading(false);
      }
  };

  const getSelectedCountryNames = () => {
    return service.countries?.map(countryId => {
      const country = countries.find(c => c.id === countryId);
      return country?.name || "";
    }).filter(Boolean);
  };

  if (loading && !service.name) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box 
      sx={{
        display: 'flex',
        flexFlow: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1">
        {id ? "Edit Service" : "Add Service"}
      </Typography>
      <Paper
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        sx={{ p: 4, display: 'flex', flexFlow: 'column', gap: 3, maxWidth: 500}}
      >
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}
        <TextField
          label="Nombre del servicio"
          value={service.name}
          onChange={(e) => setService({ ...service, name: e.target.value })}
          fullWidth
          required
        />

        <TextField
          label="Tarifa por hora (USD)"
          type="number"
          value={service.hourlyRateUSD}
          onChange={(e) =>
            setService({ ...service, hourlyRateUSD: parseFloat(e.target.value) || 0 })
          }
          fullWidth
          required
          inputProps={{ min: 0, step: 0.01 }}
        />

        {/* Selector de Proveedor */}
        <FormControl fullWidth required>
          <InputLabel>Proveedor</InputLabel>
          <Select
            value={service.providerId || ""}
            label="Proveedor"
            onChange={(e) => setService({ ...service, providerId: Number(e.target.value) })}
          >
            <MenuItem value="">
              <em>Seleccionar proveedor</em>
            </MenuItem>
            {providers.map((provider) => (
              <MenuItem key={provider.id} value={provider.id}>
                {provider.name} - {provider.nit}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Países</InputLabel>
          <Select
            multiple
            value={service.countries}
            label="Países"
            onChange={(e) => setService({ ...service, countries: e.target.value as number[] })}
            renderValue={() => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {getSelectedCountryNames().map((name, index) => (
                  <Chip key={index} label={name} />
                ))}
              </Box>
            )}
          >
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end'}}>
          <Button 
            variant="outlined" 
            onClick={() => navigate("/app/services")}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            type="submit"
            disabled={loading}
            disableElevation
          >
            {loading ? "Saving..." : (id ? "Update" : "Add")} Service
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
