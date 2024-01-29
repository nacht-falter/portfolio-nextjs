import { comfortaa } from "./ui/fonts";
import { getTechnologies } from "./lib/data";
import Header from "./header";
import Projects from "./projects";
import Footer from "./footer";

export default async function Home() {
  const technologies = await getTechnologies();

  return (
    <>
      <Header />
      <main className="flex flex-col text-center items-center z-0">
        <div
          className={`${comfortaa.className} antialiased text-lg mt-3 flex-col flex text-center items-center`}
        ></div>
        <Projects />
      </main>
      <Footer />
    </>
  );
}
