import { createServer } from '@remix-run/serve';

const server = createServer(async () => {
  return await import('./build/index.js');
});

const port = Number(process.env.PORT) || 3000;
server.listen(port, () => {
  console.log(`Remix server listening on port ${port}`);
});