import { createProvider, getProviderById, updateProvider } from "@/services";
import { Button, TextField } from '@mui/material';
import * as React from "react";
import { useNavigate, useParams } from "react-router";
import { type Provider } from "../../../types";

export default function ProviderForm() {
  const { id } = useParams<{ id?: string}>();
  const navigate = useNavigate();
  const [provider, setProvider] = React.useState<Provider>({ id: 0, nit: "", name: "", email: "", customFields: "" });
  const [customFields, setCustomFields] = React.useState<{ key: string; value: string }[]>([]);

  React.useEffect(() => {
    if (id) {
      const fetch = async () => {
        const data = await getProviderById(parseInt(id));
        setProvider(data);

        if (data.customFields) {
          const parsed = JSON.parse(data.customFields);
          // Si es objeto, lo convertimos a arreglo [{key, value}]
          const fieldsArray = Array.isArray(parsed)
            ? parsed
            : Object.entries(parsed).map(([key, value]) => ({
                key,
                value: String(value),
              }));

          setCustomFields(fieldsArray);
        }
      };
      fetch();
    }
  }, [id]);


  const handleSubmit = async () => {
    const updated = { ...provider, customFields: JSON.stringify(customFields) };
    try {
      if (id) {
        await updateProvider(parseInt(id), updated);
      } else {
        await createProvider(updated);
      }
      navigate("/providers");
    } catch (err) {
      console.error(err);
      alert("Error al guardar el proveedor.");
    }
  }

  const addCustomField = () => {
    setCustomFields([...customFields, { key: '', value: '' }]);
  };

  console.log(customFields)

  return (
    <div>
      <TextField
        label="NIT"
        value={provider.nit}
        onChange={(e) => setProvider({ ...provider, nit: e.target.value })}
      />
      <TextField
        label="Name"
        value={provider.name}
        onChange={(e) => setProvider({ ...provider, name: e.target.value })}
      />
      <TextField
        label="Email"
        value={provider.email}
        onChange={(e) => setProvider({ ...provider, email: e.target.value })}
      />
      <Button onClick={addCustomField}>Agregar Campo Personalizado</Button>
      {customFields.map((field, index) => (
        <div key={index}>
          <TextField
            label="Key"
            value={field.key}
            onChange={(e) => {
              const newFields = [...customFields];
              newFields[index].key = e.target.value;
              setCustomFields(newFields);
            }}
          />
          <TextField
            label="Value"
            value={field.value}
            onChange={(e) => {
              const newFields = [...customFields];
              newFields[index].value = e.target.value;
              setCustomFields(newFields);
            }}
          />
        </div>
      ))}

      <Button onClick={handleSubmit}>Guardar</Button>
    </div>
  );
}
