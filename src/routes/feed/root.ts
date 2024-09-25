import { FastifyPluginAsync } from "fastify";
import { fetchTrendingCompanies } from "../../service/companyService";

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.get('/', async function (_request, reply) {
        try {
            const result = await fetchTrendingCompanies(fastify);
            reply.code(200).send(result);
        } catch (e) {
            console.error(e);
            reply.internalServerError("Whops! Something went wrong on our end. Try later again!");
        }
    });
}

export default route;