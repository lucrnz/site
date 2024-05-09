import { JobCompany } from "./types/JobCompany";

export const CompanyURL: Partial<Record<JobCompany, string>> = {
  [JobCompany.kimn]: "https://www.kimn.com.ar/index.html",
  [JobCompany.cognizant]: "https://linkedin.com/company/softvision"
};
