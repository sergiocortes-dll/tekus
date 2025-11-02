import { createService, getCountries, getProviders, getServiceById, updateService } from "@/services";
import { Alert, Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
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
          getProviders(),
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
        setError("Error cargando datos iniciales");
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
              setError("El nombre del servicio es requerido");
              return;
          }
          if (service.providerId === 0) {
              setError("Debe seleccionar un proveedor");
              return;
          }

          console.log('🔄 Enviando servicio:', service);
          
          if (id) {
              await updateService(parseInt(id), service);
          } else {
              await createService(service);
          }
          navigate("/app/services");
      } catch (err: any) {
          console.error('Error completo:', err);

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

  console.log(service)

  if (loading && !service.name) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <div className="flex flex-col gap-4 p-6 max-w-2xl mx-auto">
      <Typography variant="h4" component="h1">
        {id ? "Editar Servicio" : "Crear Servicio"}
      </Typography>

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

      {/* Selector de Países */}
      <FormControl fullWidth>
        <InputLabel>Países</InputLabel>
        <Select
          multiple
          value={service.countries}
          label="Países"
          onChange={(e) => setService({ ...service, countries: e.target.value as number[] })}
          renderValue={(selected) => (
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

      <Box className="flex gap-2 justify-end">
        <Button 
          variant="outlined" 
          onClick={() => navigate("/app/services")}
        >
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit} 
          disabled={loading}
          size="large"
        >
          {loading ? "Guardando..." : (id ? "Actualizar" : "Crear")} Servicio
        </Button>
      </Box>
    </div>
  );
}
