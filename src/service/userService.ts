import { FastifyInstance } from "fastify";
import { CompanyLastVisit } from "../models/CompanyLastVisit";

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
    }
    catch(e){
        console.error(e)
        throw new Error("Unable to execute database query")
    } finally {
        client.release();
    }
}