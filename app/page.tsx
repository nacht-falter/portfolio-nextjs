import Header from "./header";
import Projects from "./projects";
import Footer from "./footer";
import Tech from "./tech";
import About from "./about";
import { montserrat } from "./ui/fonts";
import { Suspense } from "react";
import Search from "./search";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";

  return (
    <>
      <Header />
      <main className="mx-auto md:w-3/4 xl:w-2/3 px-2 md:px-0 pt-12 mt:pt-0">
        <div className="flex flex-col sm:flex-row gap-6">
          <section className="w-full lg:w-2/3 md:w-1/2">
            <h2
              className={`${montserrat.className} uppercase font-bold text-2xl mb-4`}
            >
              About Me
            </h2>
            <About />
          </section>
          <section className="w-full lg:w-1/3 md:w-1/2">
            <h2
              className={`${montserrat.className} uppercase font-bold text-2xl mb-4`}
            >
              What I use
            </h2>
            <Tech />
          </section>
        </div>
        <section className="w-full mt-6">
          <h2
            className={`${montserrat.className} uppercase font-bold text-2xl mb-4`}
          >
            Software Projects
          </h2>
          <Search placeholder="Filter projects by keywords, technologies, or date" />
          <Suspense key={query} fallback={<p>Seaching ...</p>}>
            <Projects query={query} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
