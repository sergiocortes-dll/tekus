# Service Endpoints

## **GET** /api/country

Retorna la lista completa de paises en la base de datos.
```json
[
  {
    "id": 187,
    "name": "Afghanistan",
    "serviceCountry": []
  },
  {
    "id": 166,
    "name": "Åland Islands",
    "serviceCountry": []
  },
  ...etc
]
```

## **GET** /api/country/external

Retorna una lista con todos los paises disponibles en la api.

```json
[
  {
    "name": "Syria"
  },
  {
    "name": "New Zealand"
  },
  {
    "name": "Brunei"
  },
  ...etc
]
```

## **GET** /api/country/{id}

Retorna un país especifico.

```json
{
  "id": 1,
  "name": "Colombia",
  "serviceCountry": []
}
```

## POST /api/country

Crea un nuevo país..

```json
{
  "name": "País de prueba"
}
```

## PUT /api/country/{id}
```json
{
  "id": 1,
  "name": "La Gran Colombia"
}
```

_Se tiene que especificar el id tanto en la ruta como en el cuerpo de la solicitud._