# Shodan Guatemala Scanner

Este proyecto es un script y servidor Express en Node.js que permite consultar la API de Shodan para identificar dispositivos en Guatemala y generar un resumen de IPs y puertos abiertos.

## Requisitos
- Node.js
- Una API key de Shodan (puede ser gratuita, pero con limitaciones)

## Instalación
1. Clona el repositorio o descarga los archivos.
2. Instala las dependencias:
   ```
   npm install express axios dotenv
   ```
3. Crea un archivo `.env` con tu API key:
   ```
   SHODAN_API_KEY=tu_api_key_aqui
   PORT=3000
   ```

## Uso
### Iniciar el servidor
```
node scanner.js
```

### Endpoints disponibles
- **GET /scan**
  - Realiza una consulta predeterminada a Shodan para Guatemala.
  - Muestra el resumen en texto plano.
- **POST /scan**
  - Permite enviar un comando personalizado en el cuerpo JSON:
    ```json
    { "comando": "country:\"GT\" city:\"Jalapa\"" }
    ```

## Ejemplo de consulta personalizada con curl
```
curl -X POST http://localhost:3000/scan -H "Content-Type: application/json" -d "{\"comando\": \"country:\"GT\" city:\"Jalapa\"\"}"
```

## Resumen generado
- Total de direcciones IP identificadas
- Total de IPs por puerto abierto
- Datos personales requeridos (carnet, nombre, curso, sección)

## Notas
- Si ves el error `Requires membership or higher to access`, tu API key no tiene permisos suficientes para búsquedas avanzadas.
- El archivo `.env` y la carpeta `node_modules` están ignorados en el control de versiones por `.gitignore`.

---
**Carnet:** 1990-21-10104  
**Nombre:** Nelson Guaran  
**Curso:** Seguridad Informática  
