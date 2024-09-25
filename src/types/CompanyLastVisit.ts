import { CompanyBase } from "./CompanyBase";

export type CompanyLastVisit = CompanyBase & {
    lastVisit: string;
}