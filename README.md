# Tesis GLI Frontend

Interfaz React para la simulacion de Gas Lift Intermitente Convencional.

Este repositorio contiene solo el frontend. El modelo matematico y el solver
Python viven en el backend:

```text
D:\UPB\Tesis_GLI
```

## Instalar dependencias

```powershell
npm install
```

## Ejecutar en desarrollo

```powershell
npm run dev
```

Luego abrir:

```text
http://localhost:5173
```

## Estructura

```text
Tesis_GLI_FE/
  index.html
  src/
    app.jsx
    main.jsx
    styles.css
```

## Conexion esperada con backend

Cuando el backend FastAPI este listo, el frontend enviara parametros del pozo
y recibira:

- series de tiempo por etapa
- metricas de ciclo
- produccion estimada
- consumo de gas
- curvas de presion, caudal, velocidad y alturas
