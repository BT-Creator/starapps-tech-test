import { FastifyEnvOptions } from '@fastify/env';

/**
 * This plugin doesn't have a function.
 * The reason is that we want the environment variables to be available for other plugins.
 * So we excute the function in app.ts in order to ensure that they have access to it.
 */
declare module 'fastify' {
    interface FastifyInstance {
        config: { // this should be same as the confKey in options
        // specify your typing here
        POSTGRES_USERNAME: string,
        POSTGRES_PASSWORD: string,
        POSTGRES_HOST: string,
        POSTGRES_PORT: number,
        POSTGRES_DATABASE: string
        };
    }
}

const schema = {
    type: 'object',
    required: [ 
        'POSTGRES_USERNAME', 
        'POSTGRES_PASSWORD', 
        'POSTGRES_HOST', 
        'POSTGRES_PORT', 
        'POSTGRES_DATABASE'
    ],
    properties: {
        POSTGRES_USERNAME: {
        type: 'string',
        },
        POSTGRES_PASSWORD: {
        type: 'string',
        },
        POSTGRES_HOST: {
            type: 'string',
            default: 'localhost'
        },
        POSTGRES_PORT: {
            type: 'number',
            default: 5432
        },
        POSTGRES_DATABASE: {
            type: 'string',
            default: 'postgres'
        }
    }
  }

export const envOptions: FastifyEnvOptions = {
    dotenv: true,
    schema: schema
}