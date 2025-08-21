# Neo4j Delivery - Sistema de Optimización de Rutas 
Sistema de gestión y optimización de rutas de entrega utilizando Neo4j como base de datos de grafos. Proporciona APIs REST para análisis de rutas, gestión de zonas y centros de distribución.

## 🚀 Características  
  
- **Análisis de Rutas**: Cálculo de rutas más rápidas entre centros de distribución y zonas  
- **Gestión Dinámica**: Cierre/apertura temporal de calles y modificación de tiempos  
- **Análisis de Conectividad**: Identificación de zonas accesibles y análisis de congestión  
- **API REST**: Endpoints completos para todas las operaciones  
- **Testing Integrado**: Suite de pruebas con SuperTest y Jest

## 📊 Modelo de Datos  
  
El grafo incluye:  
- **Nodos**: Zonas (residenciales/comerciales) y Centros de Distribución  
- **Relaciones**: CONECTA con propiedades de tiempo, tráfico y capacidad

## 🛠️ Instalación  
  
```bash  
# Instalar dependencias  
npm install  
  
# Configurar Neo4j (localhost:7687) 
# Inicializar base de datos  
POST /api/graph/migrate-and-seed
```
📡 API Endpoints
Consultas

    POST /api/query/shortest-path - Ruta más rápida
    POST /api/query/shortest-path-avoiding - Ruta evitando zonas bloqueadas
    GET /api/query/zonas-accesibles - Zonas accesibles en tiempo límite
    GET /api/query/calles-congestionadas - Calles con alto tráfico

Modificaciones

    POST /api/modify/close-street - Cerrar calle temporalmente
    POST /api/modify/open-street - Reabrir calle
    POST /api/modify/add-zone - Agregar nueva zona
    POST /api/modify/update-street-time - Actualizar tiempo de tránsito

Apartado Front-End
    https://github.com/Danydev018/delivery-frontend
