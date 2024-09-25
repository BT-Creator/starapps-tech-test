import { FastifyInstance } from "fastify";
import { getTrendingCompanies, InsertCompanyVisit } from "../repositories/companyRepository";
import { CompanyBase } from "../types/CompanyBase";

/**
 * Function that logs the visit of a user to a company
 * @param fastify The fastify instance
 * @param companyId The company UUID
 * @param userId The user UUID
 * @param timestamp The timestamp in a ISO 8601 format
 * @returns Boolean indicating if the visit was successfully logged
 * @throws {
 *      BadRequestError: If the user ID or company ID is malformed,
 *      NotFoundError: If the user or company is not found,
 * }
 */
export async function logCompanyVisit(
    fastify: FastifyInstance, 
    companyId: string, 
    userId: string, 
    timestamp: string): Promise<boolean> {
    const added = await InsertCompanyVisit(fastify, userId, companyId, timestamp);
    return added;
}

export async function fetchTrendingCompanies(fastify: FastifyInstance): Promise<CompanyBase[]> {
    return await getTrendingCompanies(fastify);
}