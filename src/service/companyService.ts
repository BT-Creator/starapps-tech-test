import { FastifyInstance } from "fastify";
import { DatabaseError } from "pg";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";

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
    const client = await fastify.pg.connect();
    try {
        await client.query(
            `INSERT INTO user_visits (company_id, user_id, visit_time) 
            VALUES ($1, $2, $3)`, 
            [companyId, userId, timestamp]
        );
    } catch (e) {
        if (e instanceof DatabaseError) {
            if(e.code === '22P02') { throw new BadRequestError("Malformed User ID"); }
            if(e.code === '23503' && e.constraint?.includes("company_id")) { throw new NotFoundError("Company ID not found")}
            if(e.code === '23503' && e.constraint?.includes("user_id")) { throw new NotFoundError("User ID not found")}
        }
        console.log(e);
        throw e;
    } 
    finally {
        client.release();
    }

    return true;
}