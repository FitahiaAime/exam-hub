import 'dotenv/config';
import { app } from './app.js';
import { checkDatabaseConnection } from './config/db.js';

const PORT = process.env.PORT ?? 3000;

const startServer = async (): Promise<void> => {
  try {
    await checkDatabaseConnection();

    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Échec du démarrage du serveur', error);
    process.exit(1);
  }
};

void startServer();
