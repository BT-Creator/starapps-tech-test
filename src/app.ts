import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import fastifyEnv from '@fastify/env';
import { envOptions } from './plugins/dotenv';

export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {

}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
  
}

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  await fastify.register(fastifyEnv, envOptions);
  /**
   * This loads all plugins defined in plugins and 
   * are reused throughout the application
   */
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  /**
   * This loads all plugins defined in routes
   * define your routes in one of these
   */
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })

  
};

export default app;
export { app, options }
