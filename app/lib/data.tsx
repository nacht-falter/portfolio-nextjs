import postgres from "postgres";
import dotenv from "dotenv";
import { Project, SocialLink, Technology } from "./definitions";

dotenv.config(); // Load environment variables from .env file

const POSTGRES_URL = process.env.POSTGRES_URL || "";

const sql = postgres(POSTGRES_URL, {
  max: 1,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});

export const getProjects = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const projects = await sql<
    Project[]
  >`SELECT * FROM projects ORDER BY start_date DESC`;
  for (const project of projects) {
    project.technologies = await getProjectTechnologies(project.id);
  }
  return projects;
};

export const getTechnologies = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const technologies = await sql<
    Technology[]
  >`SELECT * FROM technologies ORDER BY sort_key`;
  return technologies;
};

export const getTechCategories = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const result = await sql`
    SELECT DISTINCT category FROM technologies ORDER BY category
  `;
  const categories = result.map((result) => result.category);
  return categories;
};

const getProjectTechnologies = async (projectId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const technologies = await sql<Technology[]>`
    SELECT 
        tech.id as id,
        tech.name as name,
        tech.icon as icon
    FROM technologies tech
    JOIN project_technologies project_tech ON tech.id = project_tech.technology_id
    WHERE project_tech.project_id = ${projectId}
    ORDER BY tech.sort_key
  `;
  return technologies;
};

export const getSocialLinks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const socialLinks = await sql<SocialLink[]>`SELECT * FROM social`;
  return socialLinks;
};
