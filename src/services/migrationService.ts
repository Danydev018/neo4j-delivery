import driver from '../config/neo4j';

export async function runMigrations() {
  const session = driver.session();
  try {
    // Ejecuta cada constraint por separado
    await session.run(`
      CREATE CONSTRAINT zona_nombre_unique IF NOT EXISTS
      FOR (z:Zona)
      REQUIRE z.nombre IS UNIQUE
    `);
    await session.run(`
      CREATE CONSTRAINT centro_nombre_unique IF NOT EXISTS
      FOR (c:CentroDistribucion)
      REQUIRE c.nombre IS UNIQUE
    `);
    return { success: true, message: 'Migraciones ejecutadas (constraints creados).' };
  } finally {
    await session.close();
  }
}