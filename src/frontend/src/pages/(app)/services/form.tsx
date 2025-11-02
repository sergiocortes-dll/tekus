import { createService, getServiceById, updateService } from "@/services";
import { Button, TextField } from "@mui/material";
import * as React from "react";
import { useNavigate, useParams } from "react-router";
import type { Service } from "../../../types";

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

  React.useEffect(() => {
    if (id) {
      const fetch = async () => {
        const data = await getServiceById(parseInt(id));
        setService(data);
      };
      fetch();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (id) {
        await updateService(parseInt(id), service);
      } else {
        await createService(service);
      }
      navigate("/services");
    } catch (err) {
      console.error(err);
      alert("Error al guardar el servicio.");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <TextField
        label="Nombre del servicio"
        value={service.name}
        onChange={(e) => setService({ ...service, name: e.target.value })}
      />

      <TextField
        label="Tarifa por hora (USD)"
        type="number"
        value={service.hourlyRateUSD}
        onChange={(e) =>
          setService({ ...service, hourlyRateUSD: parseFloat(e.target.value) })
        }
      />

      <TextField
        label="ID del proveedor"
        type="number"
        value={service.providerId}
        onChange={(e) =>
          setService({ ...service, providerId: parseInt(e.target.value) })
        }
      />

      <Button variant="contained" onClick={handleSubmit}>
        Guardar
      </Button>
    </div>
  );
}
