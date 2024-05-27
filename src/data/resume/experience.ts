import type { ArrayElementType } from "~/types/ElementType";
import { JobCompany } from "~/types/resume/JobCompany";
import { JobLocation } from "~/types/resume/JobLocation";
import { JobLocationType } from "~/types/resume/JobLocationType";
import { JobTitle } from "~/types/resume/JobTitle";
import type { ResumeData } from "~/types/resume/ResumeData";
import { Skill } from "~/types/resume/Skill";

type Experience = ArrayElementType<ResumeData["experience"]>;

const entrepreneur: Experience = {
  title: JobTitle.fullstack_dev,
  companyName: JobCompany.free,
  startDate: new Date("2023-06-15"),
  location: JobLocation.mdq,
  locationType: JobLocationType.remote,
  bulletPoints: [
    "Developing an in-progress innovative application for file cloud-hosting.",
    "Pioneering an in-progress platform to empower developers to integrate widgets on their products.",
    "Writing entirely type-safe full-stack architecture for the products.",
    "Schema checking with Zod & regex.",
    "Building fast-backends with Golang and leveraging IO-binded data-driven endpoints with Node.js & Express.",
    "Deploying on custom VPS with Docker containers & setting up DDOS production."
  ],
  skills: [
    Skill.next,
    Skill.react,
    Skill.ts,
    Skill.js,
    Skill.tailwind,
    Skill.jsdoc,
    Skill.node,
    Skill.go,
    Skill.postgres,
    Skill.s3,
    Skill.docker,
    Skill.linux,
    Skill.html,
    Skill.css
  ]
};

const cognizantInternalProjects: Experience = {
  title: JobTitle.frontend_dev,
  companyName: JobCompany.cognizant,
  startDate: new Date("2023-01-01"),
  endDate: new Date("2023-06-15"),
  location: JobLocation.bsas,
  locationType: JobLocationType.remote,
  bulletPoints: [
    "Creating and defining reusable and type-safe components for a Next.js front-end.",
    "Giving suggestions for the architecture.",
    "Writing the specifications for the components and applying the same style from a Figma using CSS modules.",
    "Helping team members and proactive mentality."
  ],
  skills: [
    Skill.next,
    Skill.react,
    Skill.ts,
    Skill.js,
    Skill.jsdoc,
    Skill.webcomp,
    Skill.html,
    Skill.css,
    Skill.agile
  ]
};

const cognizantEYClient: Experience = {
  title: JobTitle.fullstack_dev,
  companyName: JobCompany.cognizant,
  startDate: new Date("2021-08-01"),
  endDate: new Date("2023-01-01"),
  location: JobLocation.bsas,
  locationType: JobLocationType.remote,
  bulletPoints: [
    "Worked for an important client on the audits area with an international team full-english speaking.",
    "Estimation of user stories with proper technical design.",
    "Deliver of high-quality components.",
    "Helping and teaching team members.",
    "Refactoring old components.",
    "Normalizing Redux store.",
    "70% Front-end development & 30% back-end development for microservice written in C#"
  ],
  skills: [
    Skill.react,
    Skill.js,
    Skill.redux,
    Skill.jsdoc,
    Skill.csharp,
    Skill.dotnet,
    Skill.mssql,
    Skill.azure,
    Skill.html,
    Skill.css,
    Skill.scss,
    Skill.agile
  ]
};

const kimnIntegrations: Experience = {
  title: JobTitle.backend_dev,
  companyName: JobCompany.kimn,
  startDate: new Date("2017-01-01"),
  endDate: new Date("2018-12-01"),
  location: JobLocation.mdq,
  locationType: JobLocationType.insite,
  bulletPoints: [
    "Integration development for Insurance System.",
    "Ditched old Microsoft Integration Services XML that was causing merge problems.",
    "Replaced with a complete C# program built from the bottom up with SOLID principles in mind",
    "Sources parsed from any source: PDF, Email, CSV, JSON, Excel, and converted into a Complete SQL Server Query to insert into the database.",
    "Developing new features of the system using SOLID principles.",
    "Deployment and mantainince of this program."
  ],
  skills: [Skill.dotnet, Skill.mssql, Skill.csharp, Skill.solid]
};

const kimnRnD: Experience = {
  title: JobTitle.fullstack_dev,
  companyName: JobCompany.kimn,
  startDate: new Date("2015-03-01"),
  endDate: new Date("2017-01-01"),
  location: JobLocation.mdq,
  locationType: JobLocationType.insite,
  bulletPoints: [
    "New features development and research.",
    "Investigation of tools for solving current problems better.",
    "Implement unit testing on the current running system.",
    "Implement usage of Git and some Agile.",
    "Developing new features of the system using SOLID principles.",
    "Refactoring NHibernate Queries to SQL stored procedures.",
    "Fixing front-end bugs."
  ],
  skills: [
    Skill.js,
    Skill.html,
    Skill.css,
    Skill.dotnet,
    Skill.csharp,
    Skill.mssql,
    Skill.php
  ]
};

export const resumeExperience: ResumeData["experience"] = [
  entrepreneur,
  cognizantInternalProjects,
  cognizantEYClient,
  kimnIntegrations,
  kimnRnD
];
