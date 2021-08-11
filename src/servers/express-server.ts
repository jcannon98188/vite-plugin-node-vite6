import { Application } from 'express';
import { IServer } from "..";
import http from "http"
import chalk from "chalk"

export const ExpressServer: IServer<Application> = {
  async start (server, config) {
    const logger = server.config.logger;
  
    const httpServer = http.createServer(async (req, res) => {
      const { viteNodeApp } = await server.ssrLoadModule(config.appPath) as { viteNodeApp: Application };
      viteNodeApp.use(server.middlewares);

      viteNodeApp(req, res)
    });

    httpServer.listen(config.port, config.host, () => {
      logger.info(chalk.greenBright`Server started on http://${config.host}:${config.port}`);
    });
  }
}