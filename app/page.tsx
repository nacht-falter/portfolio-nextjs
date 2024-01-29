import { comfortaa } from "./ui/fonts";
import Link from "next/link";
import { FaScrewdriverWrench, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { getProjects, getTechnologies } from "./lib/data";
import Header from "./header";
import Image from "next/image";

export default async function Home() {
  const projects = await getProjects();
  const technologies = await getTechnologies();

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col text-center items-center z-0">
        <div
          className={`${comfortaa.className} antialiased text-lg mt-3 flex-col flex text-center items-center`}
        >
          <p>
            <FaScrewdriverWrench className="text-2xl lg:text-3xl mt-6" />
          </p>
          <p className="mt-3">This website is under construction.</p>
          <p className="mt-3">
            Please check out my LinkedIn and GitHub profiles in the meantime.
          </p>
          <p className="flex space-x-4 mt-3">
            <Link
              href="https://www.linkedin.com/in/johannes-bernet"
              title="LinkedIn"
              className="flex items-center text-blue-700 hover:text-blue-500"
            >
              <FaLinkedinIn className="me-1" />
              <span>LinkedIn</span>
            </Link>
            <Link
              href="https://www.github.com/nacht-falter"
              title="GitHub"
              className="flex items-center text-blue-700 hover:text-blue-500"
            >
              <FaGithub className="me-1" />
              <span>GitHub</span>
            </Link>
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl mb-4">Projects</h2>
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
                          src={`https://simpleicons.org/icons/${tech.icon}.svg`}
                          alt={tech.name}
                          width={20}
                          height={20}
                          className="inline-block align-middle filter invert"
                          title={tech.name}
                        />
                      </li>
                    );
                  })}
                </ul>
                <Link href={project.repo_url ?? ""}>GitHub Repository</Link>
                <span> | </span>
                <Link href={project.deployed_url ?? ""}>Deployed Site</Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
