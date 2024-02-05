import Image from "next/image";
import { fetchTechCategories, fetchTechnologies } from "./lib/data";
import { capitalizeFirstLetter } from "./lib/utils";
import { montserrat } from "./ui/fonts";

export default async function Tech() {
  const categories = await fetchTechCategories();
  const technologies = await fetchTechnologies();

  return (
     <div className="divide-y divide-slate-200">
        {categories.map((category, key) => {
          return (
            <span key={key} className="px-6 py-3 first:pt-0 flex flex-col xl:flex-row items-center justify-between tech-category">
              <h3 className="me-2">
                {capitalizeFirstLetter(category.replace(/[0-9]/g, "")) + ":"}
              </h3>
              <span>
                {technologies
                  ?.filter((tech) => tech.category === category)
                  .map((tech, i) => {
                    return (
                      <Image
                        key={i}
                        src={`https://cdn.simpleicons.org/${tech.icon}`}
                        alt={tech.name}
                        width={20}
                        height={20}
                        className="inline-block align-middle tech-icon"
                        title={tech.name}
                      />
                    );
                  })}
              </span>
            </span>
          );
        })}
      </div>
  );
}
