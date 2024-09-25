import { FastifyPluginAsync } from "fastify";

interface IParams {
    companyId: string;
}
  
interface IReply {
    201: never,
    404: {
        reason: string;
    },
    400: {
        reason: string;
    },
    500: {
        reason: string;
    };
    501: {
        reason: string;
    }
}

interface IBody {
    userId: string;
    timestamp: string;
}

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.post<{
        Params: IParams,
        Reply: IReply,
        Body: IBody
    }>('/visit', async function (request, reply) {
        reply.code(501).send({ reason: `Not yet implemented; ${request.params.companyId} | ${request.body.timestamp} | ${request.body.userId}` });
    })
}

export default route;