# 📊 Dashboard - Infraestructura Telecomunicaciones Coopeguanacaste

## 🎯 Descripción

Dashboard interactivo para monitorear el estado de la infraestructura externa de telecomunicaciones de Coopeguanacaste, integrado con la API de OZmap v2.

## ✨ Características

✅ **Autenticación Segura**
- Login con usuario y contraseña
- Sesión segura en el navegador
- Usuario: `Telecom` | Contraseña: `Telecom#`

✅ **Mapas Interactivos**
- Ubicación de clientes en tiempo real
- Ubicación de cajas con código de colores (ocupación)
- Mapas interactivos con Leaflet

✅ **Gráficos Dinámicos**
- Top 10 cajas por ocupación
- Disponibilidad de puertos
- Estado de NAPs
- Distribución de ocupación

✅ **Estadísticas Principales**
- Total de clientes
- Total de cajas
- NAPs activos
- Ocupación promedio

✅ **Configuración Flexible**
- Configurable desde la interfaz
- Auto-actualización en tiempo real
- Guardado local de configuración

## 🚀 Instalación

### Opción 1: GitHub Pages (Recomendado)

1. Repositorio ya está configurado ✅
2. Accede a: `https://EDRODRIGUEZ29.github.io/Estado-de-infraestructura-externa-de-telecomunicaciones-de-Coopeguanacaste/`
3. Inicia sesión con:
   - Usuario: `Telecom`
   - Contraseña: `Telecom#`

### Opción 2: Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/EDRODRIGUEZ29/Estado-de-infraestructura-externa-de-telecomunicaciones-de-Coopeguanacaste.git
   cd Estado-de-infraestructura-externa-de-telecomunicaciones-de-Coopeguanacaste
   ```

2. Abre `index.html` en tu navegador

## ⚙️ Configuración

1. Inicia sesión en el dashboard
2. Haz clic en **⚙️ Configuración**
3. Rellena los campos:
   - **URL de la API**: `https://coopeguanacaste.ozmap.com.br:9994/api/v2`
   - **Token de Autenticación**: Tu JWT token de OZmap
   - **Intervalo de actualización**: En segundos (default: 300)
4. Haz clic en **"Probar Conexión"** para verificar
5. Haz clic en **"Guardar Configuración"**
6. Haz clic en **"Cargar Datos Ahora"**

## 📱 Estructura

```
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos responsive
├── js/
│   ├── auth.js         # Autenticación
│   ├── config.js       # Gestor de configuración
│   ├── api.js          # Cliente de API OZmap
│   ├── maps.js         # Gestor de mapas Leaflet
│   ├── charts.js       # Gestor de gráficos Chart.js
│   └── app.js          # Aplicación principal
└── README.md           # Esta documentación
```

## 🔌 API OZmap

Endpoints utilizados:

- `GET /api/v2/clients` - Lista de clientes
- `GET /api/v2/boxes` - Lista de cajas/CTOs
- `GET /api/v2/naps` - Lista de NAPs

Autorización: `Authorization: Bearer {TOKEN}`

## 📊 Datos Esperados

### Clientes
```json
{
  "id": "123",
  "name": "Cliente XYZ",
  "latitude": 10.2611,
  "longitude": -85.5119
}
```

### Cajas
```json
{
  "id": "456",
  "name": "Caja-01",
  "latitude": 10.2611,
  "longitude": -85.5119,
  "ocupacion": 65,
  "puertosTotal": 48,
  "puertosLibres": 15
}
```

### NAPs
```json
{
  "id": "789",
  "name": "NAP-01",
  "estado": "activo"
}
```

## 🎨 Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Mapas**: Leaflet.js
- **Gráficos**: Chart.js
- **Hosting**: GitHub Pages
- **API**: OZmap v2

## 🔐 Seguridad

- Autenticación en sesión del navegador
- Token almacenado localmente (sessionStorage)
- HTTPS en GitHub Pages
- Código repositorio público (contraseña protege acceso)

## 📝 Licencia

Privado - Coopeguanacaste

## 👨‍💻 Soporte

Para reportar problemas o sugerencias, contacta al equipo de desarrollo.
