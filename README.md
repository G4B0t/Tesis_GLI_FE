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
    App.tsx
    components/
      Button/
        index.tsx
        styles.ts
        types.ts
      FormField/
      LineChart/
      MetricCard/
      StatusPill/
      StyledApp/
    models/
      Simulation/
    pages/
      Simulation/
        index.tsx
        styles.ts
        types.ts
        constants.ts
    services/
    themes/
      mixins.ts
      theme.ts
      styles/
        GlobalStyle.ts
    types/
      styled.d.ts
    main.tsx
```

## Convenciones

- La estructura sigue la guia del proyecto `PARKOHL`.
- `components`: componentes reutilizables en carpetas PascalCase.
- Cada componente usa `index.tsx`, `styles.ts` y `types.ts`.
- `models`: entidades compartidas de dominio.
- `pages`: pantallas completas con estilos y tipos propios.
- `services`: llamadas al backend y calculos temporales de vista previa.
- `themes`: tema, estilos globales y mixins de `styled-components`.
- `types`: definiciones globales de TypeScript.

## Conexion esperada con backend

Cuando el backend FastAPI este listo, el frontend enviara parametros del pozo
y recibira:

- series de tiempo por etapa
- metricas de ciclo
- produccion estimada
- consumo de gas
- curvas de presion, caudal, velocidad y alturas
