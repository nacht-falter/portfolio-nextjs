import Image from "next/image";
import Link from "next/link";
import { getProjects } from "./lib/data";
import { montserrat } from "./ui/fonts";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section className="w-full mt-6">
      <h2 className={`${montserrat.className} uppercase font-bold text-2xl mb-4`}>Projects</h2>
      {projects.map((project, i) => {
        return (
          <div key={i}>
            <h3 className="text-xl">{project.name}</h3>
            <p>{project.description}</p>
            <ul>
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
            <Link href={project.repo_url ?? ""}>Repository</Link>
            <span> | </span>
            <Link href={project.deployed_url ?? ""}>Deployed Site</Link>
          </div>
        );
      })}
    </section>
  );
}
