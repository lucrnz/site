import { getLinksBySection } from "~/helpers/getLinks";
import { JobTitle } from "~/types/resume/JobTitle";
import type { ResumeData } from "~/types/resume/ResumeData";

export const resumePersonInfo: ResumeData["person"] = {
  firstName: "Luciano",
  lastName: "Hillcoat",
  headline: JobTitle.fullstack_dev,
  avatarUrl: "/images/profile_picture_pro.png",
  avatarAlt: "Lucianos's photo, a person with short hair and glasses",
  links: getLinksBySection("resume")
};

export const resumePersonSummary: ResumeData["summary"] = [
  "Experienced web developer who loves using the latest tech to make apps work well and grow easily. " +
    "I'm good at making code better and processes smoother so things run their best and are easy to keep up. " +
    "I always keep learning about what's new in my field to make sure my work is top-notch.",
  "I believe keeping things simple is super important, as well as I am always learning to get better. " +
    "I enjoy collaborating with others and I'm not shy about asking for help when I need it."
];
