import { createCountry, getCountryById, updateCountry } from "@/services";
import { Button, TextField } from "@mui/material";
import * as React from "react";
import { useNavigate, useParams } from "react-router";
import type { Country } from "../../../types";

export default function CountryForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [country, setCountry] = React.useState<Country>({
    id: 0,
    name: "",
    services: [],
  });

  React.useEffect(() => {
    if (id) {
      const fetch = async () => {
        const data = await getCountryById(parseInt(id));
        setCountry(data);
      };
      fetch();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (id) {
        await updateCountry(parseInt(id), country);
      } else {
        await createCountry(country);
      }
      navigate("/countries");
    } catch (err) {
      console.error(err);
      alert("Error al guardar el país.");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <TextField
        label="Nombre del país"
        value={country.name}
        onChange={(e) => setCountry({ ...country, name: e.target.value })}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Guardar
      </Button>
    </div>
  );
}
