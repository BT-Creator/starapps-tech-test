import { FastifyPluginAsync } from "fastify"
import { get100LatestVisitsByUser } from "../../../service/userService";
import { CompanyLastVisit } from "../../../models/CompanyLastVisit";
import { BadRequestError } from "../../../errors/BadRequestError";
import { NotFoundError } from "../../../errors/NotFoundError";

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
  400: {
    reason: string;
  },
  500: {
    reason: string;
  }
}

const example: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get<{
    Params: IParams,
    Reply: IReply
  }>('/visits', async function (request, reply) {

    if (!request.params.userId) {
      reply.code(400).send({ reason: "No user ID was provided!" })
    }

    else {
      try {
        const result = await get100LatestVisitsByUser(fastify, request.params.userId);
        reply.code(200).send({ visits: result });
      } catch (e) {
        if (e instanceof BadRequestError) {
          reply.code(400).send({ reason: e.message });
        } else if (e instanceof NotFoundError) {
          reply.code(404).send({ reason: `UserId ${request.params.userId} not found` })
        } else {
          reply.code(500).send({ reason: "Whops! Something went wrong on our end. Try later again!" });
        }
      }
    }
  })
}

export default example;
