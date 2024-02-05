import Image from "next/image";
import { Project } from "./lib/definitions";
import Link from "next/link";

export function Project(project: Project) {
  const formatDate = (date?: Date) =>
    date
      ? date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : "";

  const projectImage = (
    src: string,
    projectName: string,
    width: number,
    height: number,
  ) => (
    <Image
      src={src || `https://placehold.co/300x200?text=${projectName}`}
      alt={projectName}
      width={width}
      height={height}
      className="rounded-md"
    />
  );

  return (
    <div className="flex flex-col md:flex-row border-b-2 border-slate-400 lg:border-none mt-6 pb-6 lg:mt-0 lg:p-0">
      <span className="hidden md:inline-block lg:hidden md:me-6">
        {projectImage(project.image ?? "", project.name, 200, 150)}
      </span>
      <div className="flex-1 lg:border border-slate-400 lg:rounded-lg lg:pb-3">
        <span className="md:hidden flex w-full items-center justify-center mb-3">
          {projectImage(project.image ?? "", project.name, 200, 150)}
        </span>
        <div className="flex justify-between mb-3 items-center lg:bg-slate-200 lg:px-6 lg:py-3 rounded-t-lg">
          <span className="md:text-lg lg:text-base font-semibold">
            {project.name}
          </span>
          <span className="text-xs">
            {formatDate(project.start_date)} to {formatDate(project.end_date)}
          </span>
        </div>
        <div className="lg:px-6">
          <span className="hidden lg:flex w-full items-center justify-center mb-3">
            {projectImage(project.image ?? "", project.name, 200, 150)}
          </span>
          <ul className="mt-3 lg:flex lg:justify-center">
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
          <details className="mt-3 text-sm">
            <summary className="w-full bg-slate-100">More Info</summary>
            <span>{project.description}</span>
          </details>
        </div>
      </div>
    </div>
  );
}
