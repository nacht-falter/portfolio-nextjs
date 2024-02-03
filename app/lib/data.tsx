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

export const fetchProjects = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const projects = await sql<
    Project[]
  >`SELECT * FROM projects ORDER BY start_date DESC`;
  for (const project of projects) {
    project.technologies = await fetchProjectTechnologies(project.id);
  }
  return projects;
};

export const fetchFilteredProjects = async (query: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const projects = await sql<Project[]>`
    SELECT
      projects.id AS id,
      projects.name AS name,
      projects.description AS description,
      projects.start_date AS start_date,
      projects.end_date AS end_date,
      projects.deployed_url AS deployed_url,
      projects.repo_url AS repo_url,
      projects.image AS image,
      projects.tags AS tags
    FROM
      projects
    JOIN
      project_technologies ON projects.id = project_technologies.project_id
    JOIN
      technologies ON project_technologies.technology_id = technologies.id
    WHERE
      projects.name ILIKE ${`%${query}%`} OR
      technologies.name ILIKE ${`%${query}%`} OR
      projects.start_date::text ILIKE ${`%${query}%`} OR
      projects.end_date::text ILIKE ${`%${query}%`} OR
      projects.description ILIKE ${`%${query}%`} OR
      ${`%${query}%`} = ANY(projects.tags)
    GROUP BY
      projects.id, projects.name, projects.description, projects.start_date, projects.end_date,
      projects.deployed_url, projects.repo_url, projects.image, projects.tags
    ORDER BY
      projects.start_date DESC;
  `;
  for (const project of projects) {
    project.technologies = await fetchProjectTechnologies(project.id);
  }
  return projects;
};

export const fetchTechnologies = async () => {
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

const fetchProjectTechnologies = async (projectId: number) => {
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

export const fetchSocialLinks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const socialLinks = await sql<SocialLink[]>`SELECT * FROM social`;
  return socialLinks;
};
