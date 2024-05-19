import type { DateTimeDifference } from "~/helpers/DateDifference";
import type { ResumeData } from "~/types/resume/ResumeData";
import { Skill } from "~/types/resume/Skill";

export const mainSkills = [
  Skill.csharp,
  Skill.dotnet,
  Skill.js,
  Skill.ts,
  Skill.react,
  Skill.mssql
];

export const sideSkills = [
  Skill.azure,
  Skill.docker,
  Skill.go,
  Skill.node,
  Skill.postgres,
  Skill.next
];

const addYears = (years: number) =>
  ({ days: 0, months: 0, years }) as DateTimeDifference;

export const skillsExperienceAggregator: Partial<
  Record<Skill, DateTimeDifference>
> = {
  [Skill.linux]: addYears(4),
  [Skill.js]: addYears(1),
  [Skill.ts]: addYears(1),
  [Skill.react]: addYears(1),
  [Skill.docker]: addYears(1),
  [Skill.next]: addYears(1),
  [Skill.go]: addYears(2),
  [Skill.node]: addYears(2)
};

export const resumeSkills: ResumeData["skills"] = {
  main: mainSkills,
  side: sideSkills,
  expAggregator: skillsExperienceAggregator
};
