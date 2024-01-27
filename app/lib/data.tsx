import postgres from "postgres";
import dotenv from "dotenv";
import { Project } from "./definitions";

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
  return projects;
};
