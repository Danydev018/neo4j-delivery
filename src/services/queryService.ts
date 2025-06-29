import driver from '../config/neo4j';

// 1. Ruta más rápida entre un centro y una zona
export async function getShortestPath(center: string, zona: string) {
  const session = driver.session();
  try {
    const res = await session.run(`  
      MATCH p=shortestPath((start:CentroDistribucion {nombre:$center})-[*..15]->(end:Zona {nombre:$zona}))  
      RETURN p, reduce(s=0, r in relationships(p) | s + r.tiempo_minutos) AS total_time`,
      { center, zona });
    // Si no tienes APOC/algorithms, usa el built-in:
    // MATCH p=shortestPath((start:CentroDistribucion {nombre:$center})-[*..15]->(end:Zona {nombre:$zona}))
    // RETURN p, reduce(s=0, r in relationships(p) | s + r.tiempo_minutos) AS total_time
    // ...parsea el resultado según el query escogido.
    return res.records;
  } finally {
    await session.close();
  }
}

// 2. Ruta más rápida evitando ciertas zonas bloqueadas
export async function getShortestPathAvoiding(center: string, zona: string, zonasBloqueadas: string[]) {
  const session = driver.session();
  try {
    const res = await session.run(
      `
      MATCH (start:CentroDistribucion {nombre: $center}), (end:Zona {nombre: $zona})
      MATCH p=allShortestPaths((start)-[:CONECTA*..15]->(end))
      WHERE NONE(n IN nodes(p) WHERE n.nombre IN $zonasBloqueadas)
      RETURN p, reduce(s=0, r in relationships(p) | s + r.tiempo_minutos) AS total_time
      ORDER BY total_time ASC LIMIT 1
      `,
      { center, zona, zonasBloqueadas }
    );
    return res.records;
  } finally {
    await session.close();
  }
}

// 3. Zonas accesibles desde un centro en menos de X minutos
export async function getZonasAccesibles(center: string, maxTiempo: number) {
  const session = driver.session();
  try {
    const res = await session.run(
      `
      MATCH (c:CentroDistribucion {nombre: $center})- [r:CONECTA]-> (z:Zona)
      WHERE r.tiempo_minutos < $maxTiempo
      RETURN z.nombre AS zona, r.tiempo_minutos
      `,
      { center, maxTiempo }
    );
    return res.records;
  } finally {
    await session.close();
  }
}

// 4. Relaciones con mayor tráfico/congestión
export async function getCallesCongestionadas() {
  const session = driver.session();
  try {
    const res = await session.run(
      `
      MATCH (z1)-[r:CONECTA]->(z2)
      WHERE r.trafico_actual = 'alto' OR r.capacidad < 2
      RETURN z1.nombre AS origen, z2.nombre AS destino, r.trafico_actual, r.capacidad
      `
    );
    return res.records;
  } finally {
    await session.close();
  }
}

// 5. Verificar conectividad: todas las zonas accesibles desde al menos un centro
export async function getZonasNoAccesibles() {
  const session = driver.session();
  try {
    const res = await session.run(
      `
      MATCH (z:Zona)
      WHERE NOT (EXISTS {
        MATCH (c:CentroDistribucion), p=shortestPath((c)-[:CONECTA*..15]->(z)) RETURN p
      })
      RETURN z.nombre AS zona
      `
    );
    return res.records;
  } finally {
    await session.close();
  }
}

// 6. Zonas aisladas si se elimina una zona o relación
export async function getZonasAisladasSiCierra(nombreZona: string) {
  const session = driver.session();
  try {
    // Simula cierre removiendo temporalmente la zona del match
    const res = await session.run(
      `
      MATCH (z:Zona)
      WHERE z.nombre <> $nombreZona
        AND NOT (EXISTS {
          MATCH (c:CentroDistribucion),
          p=shortestPath((c)-[:CONECTA*..15]->(z))
          WHERE NONE(n IN nodes(p) WHERE n.nombre = $nombreZona)
          RETURN p
        })
      RETURN z.nombre AS zona
      `,
      { nombreZona }
    );
    return res.records;
  } finally {
    await session.close();
  }
}