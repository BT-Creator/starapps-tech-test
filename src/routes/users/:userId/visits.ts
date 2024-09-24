import { FastifyPluginAsync } from "fastify"

interface IParams {
  userId: string;
}

const example: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get<{
    Params: IParams
  }>('/visits', async function (request, _reply) {
    return {
      userId: request.params.userId
    }
  })
}

export default example;
