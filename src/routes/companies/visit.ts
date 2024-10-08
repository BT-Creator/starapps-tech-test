import { FastifyPluginAsync, FastifyReply } from "fastify";
import { logCompanyVisit } from "../../service/companyService";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";

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

/* 
    Because Windows doesn't support having ":" in folder names,
    we needed to move the dynmaic part of the link in the route itself
*/
const route: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.post<{
        Params: IParams,
        Reply: IReply,
        Body: IBody
    }>('/:companyId/visit', async function (request, reply) {
        if (!request.body.userId || !request.body.timestamp) {
            reply.badRequest(`Missing required fields in request body:${(!request.body.userId ? " userId" : '')}${(!request.body.timestamp ? " timestamp" : '')}`);
        } else if(isNaN(Date.parse(request.body.timestamp))) {
            reply.badRequest("Invalid timestamp format. Use ISO 8601 format")
        } else if(new Date(request.body.timestamp).getTime() > Date.now()) {
            reply.badRequest("Timestamp cannot be in the future")
        }
        else {
            try {
                const added = await logCompanyVisit(fastify, request.params.companyId, request.body.userId, request.body.timestamp);
                if(added) {
                    reply.code(201).send();
                } else {
                    reply.internalServerError("Unable to add the log at this time. Try again later");
                }                    
            } catch (e) {
                if (e instanceof BadRequestError) {
                    reply.badRequest(e.message);
                } else if (e instanceof NotFoundError) {
                    reply.notFound(e.message);
                } else {
                    console.error(e);
                    reply.internalServerError("Whops! Something went wrong on our end. Try later again!");
                }
            }
        }
    })
}

export default route;