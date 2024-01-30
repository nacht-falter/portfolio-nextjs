import { montserrat } from "./ui/fonts";

export default function About() {
  return (
    <section className="w-full md:w-2/3">
      <h2 className={`${montserrat.className} uppercase font-bold text-2xl mb-4`}>
        About
      </h2>
    </section>
  );
}
