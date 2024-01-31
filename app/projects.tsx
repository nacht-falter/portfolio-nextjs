import Image from "next/image";
import Link from "next/link";
import { getProjects } from "./lib/data";
import { montserrat } from "./ui/fonts";

export default async function Projects() {
  const projects = await getProjects();
  const formatDate = (date?: Date) =>
    date
      ? date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : "";

  return (
    <section className="w-full mt-6">
      <h2
        className={`${montserrat.className} uppercase font-bold text-2xl mb-4`}
      >
        Software Projects
      </h2>
      {projects.map((project, i) => {
        return (
          <div
            key={i}
            className="flex flex-col md:flex-row border-b-2 border-slate-400 mt-6 pb-6 gap-4"
          >
            <span className="hidden md:inline-block">
              <Image
                src={
                  project.image ||
                  `https://placehold.co/300x200?text=${project.name}`
                }
                alt={project.name}
                width={300}
                height={200}
                className="rounded-md"
              />
            </span>
            <span className="flex-1">
              <span className="md:hidden flex justify-center mb-3">
                <Image
                  src={
                    project.image ||
                    `https://placehold.co/300x200?text=${project.name}`
                  }
                  alt={project.name}
                  width={200}
                  height={150}
                  className="rounded-md"
                />
              </span>
              <span className="flex justify-between mb-3 items-center">
                <span className="md:text-lg font-semibold">{project.name}</span>
                <span className="text-xs">
                  {formatDate(project.start_date)}-
                  {formatDate(project.end_date)}
                </span>
              </span>
              <ul className="mt-3">
                {project.technologies?.map((tech, i) => {
                  return (
                    <li key={i} className="align-middle inline-block">
                      <Image
                        src={`https://cdn.simpleicons.org/${tech.icon}`}
                        alt={tech.name}
                        width={20}
                        height={20}
                        className="inline-block align-middle tech-icon"
                        title={tech.name}
                      />
                    </li>
                  );
                })}
              </ul>
              {project.repo_url && (
                <Link
                  href={project.repo_url ?? ""}
                  title="Got to code repository on GitHub"
                  className="flex mt-3 items-center text-xs"
                  target="_blank"
                >
                  <Image
                    src="https://cdn.simpleicons.org/github"
                    alt="github icon"
                    width={15}
                    height={15}
                    className="inline-block align-middle tech-icon"
                  />
                  <span className="project-link">GitHub Repo</span>
                </Link>
              )}
              {project.deployed_url && (
                <Link
                  href={project.deployed_url ?? ""}
                  title="Go to deployed site"
                  className="flex mt-3 items-center text-xs"
                  target="_blank"
                >
                  <Image
                    src="/globe-solid.svg"
                    alt="globe icon"
                    width={15}
                    height={15}
                    className="inline-block align-middle tech-icon"
                  />
                  <span className="project-link">{project.deployed_url}</span>
                </Link>
              )}
              <details className="mt-3">
                <summary className="w-full bg-slate-100">Show Details</summary>
                <span>{project.description}</span>
              </details>
            </span>
          </div>
        );
      })}
    </section>
  );
}
