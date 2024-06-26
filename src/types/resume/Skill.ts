import type { DateTimeDifference } from "~/helpers/DateDifference";

export enum Skill {
  // General skills
  agile = "Agile",
  solid = "SOLID Design Principles",

  // Web skills
  html = "HTML",
  js = "JavaScript",
  jsdoc = "JS Doc",
  next = "Next.js",
  php = "PHP",
  react = "React",
  redux = "Redux",
  scss = "SCSS",
  tailwind = "Tailwind CSS",
  ts = "TypeScript",
  webcomp = "Web Components",

  // Back-end technologies
  go = "Golang",
  s3 = "S3 Buckets",
  csharp = "C#",
  css = "CSS",
  dotnet = ".NET",
  mssql = "Microsoft SQL Server",
  postgres = "PostgreSQL",
  node = "Node.js (Express)",

  // Operations & platforms skills
  docker = "Docker",
  linux = "Linux",
  azure = "Azure DevOps"
}

/**
 * One might want to display the skills in a shorter form.
 */
export const skillShortName: Partial<Record<Skill, string>> = {
  [Skill.go]: "Go",
  [Skill.mssql]: "SQL Server",
  [Skill.postgres]: "Postgres",
  [Skill.node]: "Node",
  [Skill.solid]: "SOLID",
  [Skill.azure]: "Azure",
  [Skill.next]: "Next",
  [Skill.s3]: "AWS S3",
  [Skill.tailwind]: "Tailwind"
};

/**
 * Ideally, this shouldn't exists, but there are skills that build up from other sources besides actual Work experience.
 * For example, a Developer can use Node.js at home for the 3 years approximately on their side-projects,
 * assuming they work around 4 hs a day, one can safely assume they have at least 1 / 1.5 year of experience.
 */
export type SkillExperienceAggregator = Partial<
  Record<Skill, DateTimeDifference>
>;
