import postgres from "postgres";
import dotenv from "dotenv";
import { Project, Technology } from "./definitions";

dotenv.config(); // Load environment variables from .env file

const POSTGRES_URL = process.env.POSTGRES_URL || "";

const sql = postgres(POSTGRES_URL, {
  max: 1,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});

export const getProjects = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const projects = await sql<Project[]>`SELECT * FROM projects`;
  for (const project of projects) {
    project.technologies = await getProjectTechnologies(project.id);
  }
  return projects;
};

export const getTechnologies = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const technologies = await sql<Technology[]>`SELECT * FROM technologies`;
  return technologies;
};

const getProjectTechnologies = async (projectId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const technologies = await sql<Technology[]>`
    SELECT 
        tech.id as id,
        tech.name as name,
        tech.icon as icon,
        tech.url as url
    FROM technologies tech
    JOIN project_technologies project_tech ON tech.id = project_tech.technology_id
    WHERE project_tech.project_id = ${projectId}
  `;
  return technologies;
};
