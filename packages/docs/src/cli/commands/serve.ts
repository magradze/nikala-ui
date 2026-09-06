import { createServer } from "node:http";
import pc from "picocolors";
import { createDocsRequestHandler } from "../../server/index.js";

export interface ServeCommandOptions {
  port?: string;
  host?: string;
  outDir?: string;
}

export async function runServeCommand(dir = ".", options: ServeCommandOptions = {}) {
  const port = options.port ? parseInt(options.port, 10) : 4173;
  const host = options.host || "localhost";
  const handler = await createDocsRequestHandler({
    root: dir === "." ? process.cwd() : dir,
    outDir: options.outDir || "dist",
  });

  const server = createServer(async (request, response) => {
    try {
      const protocol = request.headers["x-forwarded-proto"] || "http";
      const hostHeader = request.headers.host || `${host}:${port}`;
      const url = `${protocol}://${hostHeader}${request.url || "/"}`;
      const result = await handler(new Request(url, { method: request.method, headers: request.headers as HeadersInit }));
      response.statusCode = result.status;
      result.headers.forEach((value, key) => response.setHeader(key, value));
      response.end(Buffer.from(await result.arrayBuffer()));
    } catch (error) {
      response.statusCode = 500;
      response.end(error instanceof Error ? error.message : "Internal Server Error");
    }
  });

  server.listen(port, host, () => {
    console.log();
    console.log(pc.bold(pc.cyan("  Nikala Docs Engine ")) + pc.dim("v0.12.2"));
    console.log(pc.dim(`  SSR server: ${pc.bold(`http://${host}:${port}/`)}`));
    console.log();
  });
}
