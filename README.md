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
# Instalar dependencias  [2](#header-2)
npm install  
  
# Configurar Neo4j (localhost:7687)  [3](#header-3)
# Inicializar base de datos  [4](#header-4)
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

🧪 Testing
# Ejecutar pruebas  [5](#header-5)
npm test  
  
# Las pruebas cubren:  [6](#header-6)
# - Inicialización de base de datos  [7](#header-7)
# - Operaciones de consulta  [8](#header-8)
# - Modificaciones de grafo  [9](#header-9)
