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
        Projects
      </h2>
      {projects.map((project, i) => {
        return (
          <div key={i}>
            <span className="flex justify-between mb-3">
              <span className="text-lg">{project.name}</span>
              <span className="text-xs">
                {formatDate(project.start_date)}-{formatDate(project.end_date)}
              </span>
            </span>
            <details className="mt-3">
              <summary className="w-full bg-slate-200">Show Details</summary>
              <span>{project.description}</span>
            </details>
            <ul className="mt-3 flex justify-end">
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
                className="block mt-3"
              >
                <Image
                  src="https://cdn.simpleicons.org/github"
                  alt="github icon"
                  width={20}
                  height={20}
                  className="inline-block align-middle tech-icon"
                />
                <span> GitHub Repo</span>
              </Link>
            )}
            {project.deployed_url && (
              <Link
                href={project.deployed_url ?? ""}
                title="Go to deployed site"
                className="block mt-3"
              >
                <Image
                  src="/globe-solid.svg"
                  alt="globe icon"
                  width={20}
                  height={20}
                  className="inline-block align-middle tech-icon"
                />
                <span> Deployed site</span>
              </Link>
            )}
          </div>
        );
      })}
    </section>
  );
}
