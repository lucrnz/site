import { JobTitle } from "~/types/resume/JobTitle";
import type { ResumeData } from "~/types/resume/ResumeData";
import { resumeCertifications } from "./certifications";
import { resumeExperience } from "./experience";
import { resumePersonInfo, resumePersonSummary } from "./personInfo";
import { resumeSkills } from "./skills";

export const resumeData: ResumeData = {
  person: resumePersonInfo,
  industry: "IT",
  interestedIn: JobTitle.fullstack_dev,
  summary: resumePersonSummary,
  experience: resumeExperience,
  certifications: resumeCertifications,
  skills: resumeSkills
};
