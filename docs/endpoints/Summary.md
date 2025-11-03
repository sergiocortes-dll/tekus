# Service Endpoints

## **GET** /api/summary

Retorna un arreglo con los dos summary.

```json
{
    "providersPerCountry": [
        {
            "countryId": 1,
            "countryName": "La Gran Colombia",
            "count": 3
        },
        ...etc
    ],
    "servicesPerCountry": [
        {
            "countryId": 1,
            "countryName": "La Gran Colombia",
            "count": 6
        },
        ...etc
    ]
}
```