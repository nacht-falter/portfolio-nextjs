import { fetchFilteredProjects } from "./lib/data";
import { Project } from "./project";

export default async function Projects({ query }: { query: string }) {
  const projects = await fetchFilteredProjects(query);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-0 lg:gap-6 p-0 lg:px-6 section-container">
      {Object.keys(projects).length > 0 ? (
        projects.map((project, i) => {
          return <Project key={i} {...project} />;
        })
      ) : (
        <div className="flex justify-center items-center h-48">
          <span>No projects found</span>
        </div>
      )}
    </div>
  );
}
