import driver from '../config/neo4j';

// 1. Cierre temporal: desactiva una relación (puedes borrarla o marcarla como cerrada)
export async function closeStreet(origen: string, destino: string) {
  const session = driver.session();
  try {
    // Marca la relación como cerrada
    await session.run(
      `
      MATCH (a {nombre: $origen})-[r:CONECTA]->(b {nombre: $destino})
      SET r.cerrada = true
      RETURN a.nombre, b.nombre, r.cerrada
      `,
      { origen, destino }
    );
    return { success: true, message: `Calle de ${origen} a ${destino} cerrada temporalmente` };
  } finally {
    await session.close();
  }
}

// 2. Reapertura de calle
export async function openStreet(origen: string, destino: string) {
  const session = driver.session();
  try {
    await session.run(
      `
      MATCH (a {nombre: $origen})-[r:CONECTA]->(b {nombre: $destino})
      REMOVE r.cerrada
      RETURN a.nombre, b.nombre, r.cerrada
      `,
      { origen, destino }
    );
    return { success: true, message: `Calle de ${origen} a ${destino} reabierta` };
  } finally {
    await session.close();
  }
}

// 3. Agregar nueva zona o centro y conexiones
export async function addZone(nombre: string, tipoZona: string, conexiones: { destino: string, tiempo: number, trafico: string, capacidad: number }[]) {
  const session = driver.session();
  try {
    // Crear nodo zona
    await session.run(
      `CREATE (z:Zona {nombre: $nombre, tipo_zona: $tipoZona})`,
      { nombre, tipoZona }
    );
    // Crear conexiones
    for (const { destino, tiempo, trafico, capacidad } of conexiones) {
      await session.run(
        `
        MATCH (z:Zona {nombre: $nombre}), (d {nombre: $destino})
        CREATE (z)-[:CONECTA {tiempo_minutos: $tiempo, trafico_actual: $trafico, capacidad: $capacidad}]->(d)
        `,
        { nombre, destino, tiempo, trafico, capacidad }
      );
    }
    return { success: true, message: `Zona ${nombre} agregada con conexiones` };
  } finally {
    await session.close();
  }
}

export async function addCentro(nombre: string, conexiones: { destino: string, tiempo: number, trafico: string, capacidad: number }[]) {
  const session = driver.session();
  try {
    await session.run(
      `CREATE (c:CentroDistribucion {nombre: $nombre})`,
      { nombre }
    );
    for (const { destino, tiempo, trafico, capacidad } of conexiones) {
      await session.run(
        `
        MATCH (c:CentroDistribucion {nombre: $nombre}), (d {nombre: $destino})
        CREATE (c)-[:CONECTA {tiempo_minutos: $tiempo, trafico_actual: $trafico, capacidad: $capacidad}]->(d)
        `,
        { nombre, destino, tiempo, trafico, capacidad }
      );
    }
    return { success: true, message: `Centro ${nombre} agregado con conexiones` };
  } finally {
    await session.close();
  }
}

// 4. Actualizar tiempo de tránsito de una calle
export async function updateStreetTime(origen: string, destino: string, nuevoTiempo: number) {
  const session = driver.session();
  try {
    await session.run(
      `
      MATCH (a {nombre: $origen})-[r:CONECTA]->(b {nombre: $destino})
      SET r.tiempo_minutos = $nuevoTiempo
      RETURN a.nombre, b.nombre, r.tiempo_minutos
      `,
      { origen, destino, nuevoTiempo }
    );
    return { success: true, message: `Tiempo de tránsito actualizado para calle de ${origen} a ${destino}` };
  } finally {
    await session.close();
  }
}