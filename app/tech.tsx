import Image from "next/image";
import { getTechCategories, getTechnologies } from "./lib/data";
import { capitalizeFirstLetter } from "./lib/utils";
import { montserrat } from "./ui/fonts";

export default async function Tech() {
  const categories = await getTechCategories();
  const technologies = await getTechnologies();

  return (
    <section className="w-full lg:w-1/3 md:w-1/2">
      <h2
        className={`${montserrat.className} uppercase font-bold text-2xl mb-4`}
      >
        What I use
      </h2>
      <div>
        {categories.map((category, key) => {
          return (
            <span key={key} className="flex flex-col xl:flex-row xl:items-center tech-category">
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
    </section>
  );
}
