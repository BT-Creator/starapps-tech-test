import { FastifyPluginAsync } from "fastify"
import { getVisitsByUser } from "../../../service/userService";
import { CompanyLastVisit } from "../../../models/CompanyLastVisit";

interface IParams {
  userId: string;
}

interface IReply {
  200: {
    visits: CompanyLastVisit[];
  },
  404: {
    reason: string;
  },
  501: {
    reason: string;
  }
}

const example: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get<{
    Params: IParams,
    Reply: IReply
  }>('/visits', async function (request, reply) {
    try{
      const result = await getVisitsByUser(fastify, request.params.userId);
      reply.code(200).send({ visits: result });
    } catch(e) {
      console.error(e)
      reply.code(404).send({ reason: "User not found"})
    }
  })
}

export default example;
