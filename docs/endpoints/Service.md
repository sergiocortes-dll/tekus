# Service Endpoints

## **GET** /api/service

| Params      | Type       |
|-------------|------------|
| pageNumber  | `int?`     |
| pageSize    | `int?`     |
| search      | `string?`  | 
| searchField | `string?`  |

Retorna una lista con 10 elementos (por defecto `pageNumber`) con paginación.

```json
{
  "pageNumber": 1,
  "pageSize": 10,
  "totalPages": 3,
  "totalRecords": 27,
  "sort": null,
  "sortDirection": "asc",
  "search": null,
  "searchField": null,
  "data": [
    {
      "id": 1,
      "name": "Descarga espacial de contenidos",
      "hourlyRateUSD": 50.00,
      "providerId": 12,
      "providerName": "Sergio Cortes",
      "countries": [
        {
          "id": 1,
          "name": "Colombia"
        },
        {
          "id": 2,
          "name": "Perú"
        },
        {
          "id": 3,
          "name": "México"
        }
      ]
    },
    ...etc
  ]
}
```

_Ejemplo: `/api/service?pageNumber=2&pageSize=5&search=Busqueda&searchField=campoDeBusqueda`_

## **GET** /api/service/{id}

Retorna un servicio especifico.

```json
{
{
  "id": 1,
  "name": "Descarga espacial de contenidos",
  "hourlyRateUSD": 50.00,
  "providerId": 12,
  "providerName": "Sergio Cortes",
  "countries": [
    {
      "id": 1,
      "name": "Colombia"
    },
    {
      "id": 2,
      "name": "Perú"
    },
    {
      "id": 3,
      "name": "México"
    }
  ]
}
```

## **GET** /api/service/by-provider/{id}

Retorna una lista de servicios de acuerdo al proveedor al que esten vinculadas.

```json
[
  {
    "id": 2,
    "name": "Desaparición forzada de bytes",
    "hourlyRateUSD": 75.00,
    "providerId": 1,
    "providerName": "Importaciones Tekus S.A.",
    "countries": [
      {
        "id": 1,
        "name": "Colombia"
      },
      {
        "id": 4,
        "name": "Argentina"
      },
      {
        "id": 178,
        "name": "Chad"
      },
      {
        "id": 226,
        "name": "Canada"
      }
    ]
  },
  ...etc
]
```

## POST /api/service

Crea un nuevo servicio.

```json
{
  "name": "Nuevo Servicio",
  "hourlyRateUSD": 125,
  "providerId": 4,
  "countries": [
    81
  ]
}
```

## PUT /api/provider/{id}
```json
{
  "name": "Nuevo Servicio",
  "hourlyRateUSD": 125,
  "providerId": 4,
  "countries": [
    81
  ]
}
```