import { FastifyPluginAsync, FastifyReply } from "fastify";

interface IParams {
    companyId: string;
}
  
interface IReply {
    201: never,
    '4xx': FastifyReply,
    '5xx': FastifyReply
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
        if (!request.body.userId || !request.body.timestamp) {
            reply.badRequest(`Missing required fields in request body: ${(!request.body.userId && "userId")} ${(!request.body.timestamp && "timestamp")}`);
        } else {
            reply.notImplemented(`Not yet implemented; ${request.params.companyId} | ${request.body.timestamp} | ${request.body.userId}`)
        }
    })
}

export default route;