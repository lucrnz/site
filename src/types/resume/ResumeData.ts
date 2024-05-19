import type { DateTimeDifference } from "~/helpers/DateDifference";
import type { LinkData } from "~/types/link";
import type { JobCompany } from "./JobCompany";
import type { JobLocation } from "./JobLocation";
import type { JobLocationType } from "./JobLocationType";
import type { JobTitle } from "./JobTitle";
import type { Skill, SkillExperienceAggregator } from "./Skill";

type Paragraphs = string[];

type ResumePerson = {
  firstName: string;
  lastName: string;
  headline: string;
  avatarUrl: string;
  avatarAlt: string;
  links: LinkData[];
};

type ResumeExperience = {
  title: JobTitle;
  companyName: JobCompany;
  startDate: Date;
  endDate?: Date;
  location: JobLocation;
  locationType: JobLocationType;
  bulletPoints: string[];
  skills: Skill[];
};

type ResumeCertificate = {
  title: string;
  issuedBy: string;
  issuedDate: string;
  certUrl: string;
  length?: string;
  items: string[][];
  itemsTitle: string;
  includesPractice: boolean;
};

type ResumeSkillSet = {
  main: Skill[];
  side: Skill[];
  expAggregator?: SkillExperienceAggregator;
};

export type ResumeData = {
  person: ResumePerson;
  summary: Paragraphs;
  industry: string;
  interestedIn: JobTitle;
  skills: ResumeSkillSet;
  experience: ResumeExperience[];
  certifications: ResumeCertificate[];
};
