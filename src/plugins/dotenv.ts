import fp from 'fastify-plugin'
import fastifyEnv from "@fastify/env";
import { FastifyEnvOptions } from '@fastify/env';

const schema = {
    type: 'object',
    required: ['POSTGRES_USERNAME', 'POSTGRES_PASSWORD'],
    properties: {
        POSTGRES_USERNAME: { type: 'string' },
        POSTGRES_PASSWORD: { type: 'string' }
    }
}

const options: FastifyEnvOptions = {
    dotenv: true,
    schema: schema
}

export default fp<FastifyEnvOptions>(async (fastify) => {
    fastify.register(fastifyEnv, options)
});