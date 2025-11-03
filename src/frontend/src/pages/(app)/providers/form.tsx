import { createProvider, getProviderById, updateProvider } from "@/services";
import { Box, Button, Divider, Paper, TextField, Typography } from '@mui/material';
import * as React from "react";
import { useNavigate, useParams } from "react-router";
import { type Provider } from "../../../types";
import { AutoAwesome } from "@mui/icons-material";
import ServicesByProvider from "./services";

export default function ProviderForm() {
  const { id } = useParams<{ id?: string}>();
  const navigate = useNavigate();
  const [provider, setProvider] = React.useState<Provider>({ id: 0, nit: "", name: "", email: "", customFields: "" });
  const [customFields, setCustomFields] = React.useState<{ key: string; value: string }[]>([]);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchInitialData = async () => {
      if (id) {
        setLoading(true);
        try {
          const data = await getProviderById(parseInt(id));
          setProvider(data);

          if (data.customFields) {
            const parsed = JSON.parse(data.customFields);
            const fieldsArray = Array.isArray(parsed)
              ? parsed
              : Object.entries(parsed).map(([key, value]) => ({
                  key,
                  value: String(value),
                }));

            setCustomFields(fieldsArray);
          }
        } catch (err) {
          setError("Error cargando datos iniciales.")
        } finally {
          setLoading(false);
        }
      }
    }
    
    fetchInitialData();
  }, [id]);


  const handleSubmit = async () => {
    setLoading(true);
    setError("");

     const filteredFields = customFields.filter(
      (f) => f.key.trim() !== "" && f.value.trim() !== ""
    );

    const updated = { ...provider, customFields: JSON.stringify(filteredFields) };
    try {
      if (!provider.name.trim()) {
        setError("Provider name is required.");
        return;
      }

      if (id) {
        await updateProvider(parseInt(id), updated);
      } else {
        await createProvider(updated);
      }
      navigate("/app/providers");
    } catch (err: any) {
      if (err.response?.data) {
        setError(err.response.data.message || JSON.stringify(err.response.data));
      } else {
        setError("Error al guardar el proveedor");
      }
    } finally {
      setLoading(false);
    }
  }

  const addCustomField = () => {
    setCustomFields([...customFields, { key: '', value: '' }]);
  };

  if (loading && !provider.name ) {
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
        {id ? "Edit Provider" : "Add Provider"}
      </Typography>
      <Box sx={{ display: 'flex', gap: 4}}>
        <Paper
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          sx={{ p: 4, display: 'flex', flexFlow: 'column', gap: 2, maxWidth: 500}}
        >
          <TextField
            label="NIT"
            required
            size="small"
            value={provider.nit}
            onChange={(e) => setProvider({ ...provider, nit: e.target.value })}
          />
          <TextField
            label="Name"
            required
            size="small"
            value={provider.name}
            onChange={(e) => setProvider({ ...provider, name: e.target.value })}
          />
          <TextField
            label="Email"
            required
            size="small"
            value={provider.email}
            onChange={(e) => setProvider({ ...provider, email: e.target.value })}
          />

          <Divider />

          <Paper variant="outlined" sx={{ display: 'flex', gap: 2, p: 1, alignItems: 'center'}}>
            <Typography sx={{ flex: 1}} component="div">Custom fields</Typography>
            <Button onClick={addCustomField} variant="outlined" startIcon={<AutoAwesome />}>Add</Button>
          </Paper>

          {customFields.length > 0 && <Divider />}
          {customFields.map((field, index) => (
            <Box sx={{ display: 'flex', gap: 2}} key={index}>
              <TextField
                label="Key"
                value={field.key}
                size="small"
                onChange={(e) => {
                  const newFields = [...customFields];
                  newFields[index].key = e.target.value;
                  setCustomFields(newFields);
                }}
              />
              <TextField
                label="Value"
                value={field.value}
                size="small"
                onChange={(e) => {
                  const newFields = [...customFields];
                  newFields[index].value = e.target.value;
                  setCustomFields(newFields);
                }}
              />
            </Box>
          ))}

          <Divider />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end'}}>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/app/providers")}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              type="submit"
              disabled={loading}
              disableElevation
            >
              {loading ? "Saving..." : (id ? "Update" : "Add")} Provider
            </Button>
          </Box>
        </Paper>
        {id && <ServicesByProvider id={parseInt(id)} />} 
      </Box>
    </Box>
  );
}
