import { FastifyInstance } from "fastify";
import { DatabaseError } from "pg";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { CompanyBase } from "../types/CompanyBase";
/**
 * Inserts an company visit into the database
 * @param fastify The Fastify instance
 * @param userId The UUID of the user
 * @param companyId The UUID op the company
 * @param timestamp An ISO 8601 timestamp
 * @returns Boolean indicating if the visit was successfully logged
 * @throws {
 *    BadRequestError: If the user ID or company ID is malformed,
 *    NotFoundError: If the user or company is not found,
 * }
 */
export async function InsertCompanyVisit(fastify: FastifyInstance, userId: string, companyId: string, timestamp: string = new Date().toISOString()): Promise<boolean> {
    const client = await fastify.pg.connect();
    try {
        const res = await client.query(
            `INSERT INTO user_visits (company_id, user_id, visit_time) 
            VALUES ($1, $2, $3)`, 
            [companyId, userId, timestamp]
        );
        if(res.rowCount === 1) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        if (e instanceof DatabaseError) {
            if(e.code === '22P02') { throw new BadRequestError("Malformed User ID"); }
            if(e.code === '23503' && e.constraint?.includes("company_id")) { throw new NotFoundError("Company ID not found")}
            if(e.code === '23503' && e.constraint?.includes("user_id")) { throw new NotFoundError("User ID not found")}
        }
        throw e;
    } 
    finally {
        client.release();
    }
}
/**
 * Returns the most visited companyIds in the last 24 hours
 * @param fastify The Fastify instance
 * @returns An array of 0 or more length containing the ids of the companies
 */
export async function getTrendingCompanies(fastify: FastifyInstance): Promise<CompanyBase[]> {
    const client = await fastify.pg.connect();
    try {
        const res = await client.query<CompanyBase>(
            `SELECT company_id, COUNT(DISTINCT user_id) AS unique_visitors
             FROM user_visits
             WHERE visit_time >= NOW() - INTERVAL '24 hours'
             GROUP BY company_id
             ORDER BY unique_visitors DESC`);
        return res.rows;
    } finally {
        client.release();
    }
}