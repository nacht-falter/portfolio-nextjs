import { montserrat } from "./ui/fonts";

export default function About() {
  return (
    <section className="w-full md:w-2/3">
      <h2
        className={`${montserrat.className} uppercase font-bold text-2xl mb-4`}
      >
        About Me
      </h2>
      <p>
        I am a software developer based in Freiburg, Germany. I love solving
        problems and building things with code.
      </p>
      <p className="mt-3">
        I have an academic background in musicology as a researcher and teacher.
      </p>
    </section>
  );
}
