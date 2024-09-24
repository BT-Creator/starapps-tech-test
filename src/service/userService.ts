import { FastifyInstance } from "fastify";
import { CompanyLastVisit } from "../models/CompanyLastVisit";
import { BadRequestError } from "../errors/BadRequestError";

/**
 * 
 * @param fastify The fastify instance
 * @param userId The user ID of the selected user
 * @returns An array of all the companies the user has visited
 * @throws {
 *    BadRequestError: If the user ID is malformed
 * }
 */
export async function getVisitsByUser(fastify: FastifyInstance, userId: string): Promise<CompanyLastVisit[]> {
    const client = await fastify.pg.connect();
    try{
        const { rows } = await client.query<CompanyLastVisit>(`
            SELECT c.id, uv.visit_time
            FROM user_visits uv
            JOIN companies c on uv.company_id = c.id
            WHERE uv.user_id = $1
            ORDER BY uv.visit_time DESC`,
            [userId]
        );
        return rows;
    } catch(e) {
        console.error(e);
        throw new BadRequestError("Malformed User ID");
    } finally {
        client.release();
    }
}

export async function getUser(fastify: FastifyInstance, userId: string) {
    const client = await fastify.pg.connect();
    try{
        const res = await client.query(`
            SELECT *
            FROM users
            WHERE id = $1`,
            [userId]
        );
        if(res.rowCount){
            return res.rows[0];
        } else {
            return null;
        }
    }
    catch(e){
        console.error(e);
        throw new BadRequestError("Malformed User ID");
    } finally {
        client.release();
    }
}