import { montserrat } from "./ui/fonts";

export default function About() {
  return (
    <section className="w-full lg:w-2/3 md:w-1/2">
      <h2
        className={`${montserrat.className} uppercase font-bold text-2xl mb-4`}
      >
        About Me
      </h2>
      <p>Hi 👋</p>
      <p>My name is Johannes.</p>
      <p>
        I am a software developer based in Freiburg, Germany. I love solving
        problems and building things.
      </p>
      <p className="mt-3">
        I have a background in musicology as a researcher and teacher.
      </p>
    </section>
  );
}
