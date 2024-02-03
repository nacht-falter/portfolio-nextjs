import Header from "./header";
import Projects from "./projects";
import Footer from "./footer";
import Tech from "./tech";
import About from "./about";

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
          <About />
          <Tech />
        </div>
        <Projects query={query} />
      </main>
      <Footer />
    </>
  );
}
