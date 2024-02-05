import postgres from "postgres";
import dotenv from "dotenv";
import {
  Project,
  ProjectTechnology,
  SocialLink,
  Technology,
} from "./definitions";

dotenv.config(); // Load environment variables from .env file

const POSTGRES_URL = process.env.POSTGRES_URL || "";

const sql = postgres(POSTGRES_URL, {
  max: 1,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});

export const fetchFilteredProjects = async (query: string) => {
  try {
    const projectTechnologies = await fetchProjectTechnologies();
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
      project.technologies = projectTechnologies.filter(
        (tech) => tech.project_id === project.id,
      );
    }
    return projects;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch projects");
  }
};

export const fetchTechnologies = async () => {
  try {
    const technologies = await sql<
      Technology[]
    >`SELECT * FROM technologies ORDER BY sort_key`;
    return technologies;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch technologies");
  }
};

export const fetchTechCategories = async () => {
  try {
    const result = await sql`
    SELECT DISTINCT category FROM technologies ORDER BY category
  `;
    const categories = result.map((result) => result.category);
    return categories;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch tech categories");
  }
};

const fetchProjectTechnologies = async () => {
  try {
    const technologies = await sql<ProjectTechnology[]>`
     SELECT 
        project_tech.project_id as project_id,
        tech.id as technology_id,
        tech.name as name,
        tech.icon as icon
      FROM project_technologies project_tech
      JOIN technologies tech ON tech.id = project_tech.technology_id
  `;
    return technologies;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch project technologies");
  }
};

export const fetchSocialLinks = async () => {
  const socialLinks = await sql<SocialLink[]>`SELECT * FROM social`;
  return socialLinks;
};
