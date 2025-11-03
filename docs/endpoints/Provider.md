# Provider Endpoints

## **GET** /api/provider

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
  "totalPages": 2,
  "totalRecords": 12,
  "search": null,
  "searchField": null,
  "data": [
    {
      "id": 1,
      "nit": "123456789",
      "name": "Importaciones Tekus S.A.",
      "email": "info@tekus.co"
    },
    {
      "id": 2,
      "nit": "987654321",
      "name": "Proveedor B",
      "email": "contacto@providerb.com"
    },
    ...etc
  ]
}
```

_Ejemplo: `/api/provider?pageNumber=2&pageSize=5&search=Busqueda&searchField=campoDeBusqueda`_

## **GET** /api/provider/all

Retorna la lista completa de proveedores.

```json

[
    {
        "id": 1,
        "nit": "123456789",
        "name": "Importaciones Tekus S.A.",
        "email": "info@tekus.co",
        "customFields": "[{\"key\":\"ContactoMarte\",\"value\":\"123-456\"},{\"key\":\"MascotasNomina\",\"value\":\"5\"},{\"key\":\"test\",\"value\":\"test\"},{\"key\":\"asdasd\",\"value\":\"asdasd\"},{\"key\":\"jajaja\",\"value\":\"ajjaja\"}]",
        "services": []
    },
    {
        "id": 2,
        "nit": "987654321",
        "name": "Proveedor B",
        "email": "contacto@providerb.com",
        "customFields": "{\"CampoExtra\": \"Valor1\"}",
        "services": []
    },
    ...etc
]
```

## **GET** /api/provider/{id}

Retorna un proveedor especifico.

```json
{
    "id": 1,
    "nit": "123456789",
    "name": "Importaciones Tekus S.A.",
    "email": "info@tekus.co",
    "customFields": "[{\"key\":\"ContactoMarte\",\"value\":\"123-456\"},{\"key\":\"MascotasNomina\",\"value\":\"5\"},{\"key\":\"test\",\"value\":\"test\"},{\"key\":\"asdasd\",\"value\":\"asdasd\"},{\"key\":\"jajaja\",\"value\":\"ajjaja\"}]",
    "services": []
}
```

## POST /api/provider

Crea un nuevo proveedor.

```json
{
    "name": "Test",
    "nit": "123123",
    "email": "correo@correo.com",
    "customFields": "[{\"key\":\"ContactoMarte\",\"value\":\"123-456\"}]"
}
```

## PUT /api/provider/{id}
```json
{
    "name": "NuevoNombre",
    "nit": "NuevoNit",
    "email": "nuevoCorreo@correo.com",
    "customFields": "[{\"key\":\"ContactoMarte\",\"value\":\"123-456\"}]"
}
```