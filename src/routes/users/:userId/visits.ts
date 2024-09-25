import { FastifyPluginAsync, FastifyReply } from "fastify"
import { get100LatestVisitsByUser } from "../../../service/userService";
import { CompanyLastVisit } from "../../../types/CompanyLastVisit";
import { BadRequestError } from "../../../errors/BadRequestError";
import { NotFoundError } from "../../../errors/NotFoundError";

interface IParams {
  userId: string;
}

interface IReply {
  200: {
    visits: CompanyLastVisit[];
  },
  '4xx': FastifyReply,
  '5xx': FastifyReply
}

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get<{
    Params: IParams,
    Reply: IReply
  }>('/visits', async function (request, reply) {
    if (!request.params.userId) {
      reply.badRequest("No user ID was provided!")
    }

    else {
      try {
        const result = await get100LatestVisitsByUser(fastify, request.params.userId);
        reply.code(200).send({ visits: result });
      } catch (e) {
        if (e instanceof BadRequestError) {
          reply.badRequest(e.message)
        } else if (e instanceof NotFoundError) {
          reply.notFound(`UserId ${request.params.userId} does not exist` )
        } else {
          reply.internalServerError("Whops! Something went wrong on our end. Try later again!")
        }
      }
    }
  })
}

export default route;
