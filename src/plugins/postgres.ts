import fp from 'fastify-plugin'
import fastifyPostgres from '@fastify/postgres'
import { PostgresPluginOptions } from '@fastify/postgres'

export default fp<PostgresPluginOptions>(async (fastify) => {
    console.log(`postgres://${fastify.config.POSTGRES_USERNAME}:${fastify.config.POSTGRES_PASSWORD}@${fastify.config.POSTGRES_HOST}:${fastify.config.POSTGRES_PORT}/${fastify.config.POSTGRES_DATABASE}`)
    fastify.register(fastifyPostgres, {
        connectionString: `postgres://${fastify.config.POSTGRES_USERNAME}:${fastify.config.POSTGRES_PASSWORD}@${fastify.config.POSTGRES_HOST}:${fastify.config.POSTGRES_PORT}/${fastify.config.POSTGRES_DATABASE}`
    })
});