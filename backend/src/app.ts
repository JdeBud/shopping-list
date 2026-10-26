import { createApp } from './api/server.ts';
import { connectDatabase, disconnectDatabase } from './database/Mongodb.ts';

await connectDatabase();

const port = Number(process.env.PORT ?? 15500);

// Express 5 passes errors like EADDRINUSE to the callback – exit instead of reporting success
const server = createApp().listen(port, (error) => {
  if (error) {
    console.error(`Could not start server on port ${port}:`, error);

    process.exit(1);
  }

  console.log(`App runs on port ${port}`);
});

let shuttingDown = false;

const shutdown = async (signal: NodeJS.Signals) => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  console.log(`${signal} received, shutting down …`);

  try {
    // No longer accepting new requests; ongoing requests will still be answered
    await new Promise<void>((resolve, reject) =>
      server.close((err) => (err ? reject(err) : resolve())),
    );

    await disconnectDatabase();

    process.exit(0);
  } catch (err) {
    console.error('Shutdown Error:', err);

    process.exit(1);
  }
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
