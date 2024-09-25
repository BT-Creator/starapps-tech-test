import { FastifyInstance } from "fastify";
import { CompanyLastVisit } from "../types/CompanyLastVisit";
import { NotFoundError } from "../errors/NotFoundError";
import { getLatestVisitsOfUser, getUser } from "../repositories/userRepository";

/**
 * Get the 100 latest company visits of a user
 * @param fastify The fastify instance
 * @param userId The user ID of the selected user
 * @returns An array of all the companies the user has visited
 * @throws {
 *    NotFoundError: If the user does not exist,
 *    BadRequestError: If the user ID is malformed
 * }
 */
export async function get100LatestVisitsByUser(fastify: FastifyInstance, userId: string): Promise<CompanyLastVisit[]> {
    const companies = await getLatestVisitsOfUser(fastify, userId, 100);
    if (companies.length > 0) {
        return companies;
    } else if (await getUser(fastify, userId) !== null) {
        return [];
    } else {
        throw new NotFoundError(`UserId ${userId} does not exist`);
    }
}