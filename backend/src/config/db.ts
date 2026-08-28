import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

export const checkDatabaseConnection = async (): Promise<void> => {
  const client = await pool.connect();

  try {
    await client.query('SELECT NOW()');
    console.log('✅ Connexion PostgreSQL établie');
  } finally {
    client.release();
  }
};
