import { montserrat } from "./ui/fonts";
import dotenv from "dotenv";
import Link from "next/link";
import Image from "next/image";
import { getSocialLinks } from "./lib/data";

dotenv.config();

export default async function About() {
  const socialLinks = await getSocialLinks();
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "";

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
      <p className="flex flex-col lg:flex-row items-center justify-center border-t border-slate-400 mt-3 pt-3 pb-0">
        <span className="pb-3 lg:pb-0">Get in touch:</span>
        <span>
          {socialLinks.map((socialLink, i) => {
            return (
              <Link
                href={socialLink.url}
                key={i}
                className="social-link-dark h-8 w-8 inline-block align-middle text-center aspect-square rounded-full leading-7 mx-3"
                title={socialLink.name}
              >
                <Image
                  src={`https://cdn.simpleicons.org/${socialLink.icon}`}
                  alt={socialLink.name}
                  width={15}
                  height={15}
                  className="inline"
                />
              </Link>
            );
          })}
          <Link
            href={`mailto:${CONTACT_EMAIL}`}
            title="Contact me"
            className="social-link-dark h-8 w-8 inline-block align-middle text-center aspect-square rounded-full leading-7 mx-3"
          >
            <Image
              src="/envelope-solid.svg"
              alt="mail"
              width={15}
              height={15}
              className="inline"
            />
          </Link>
        </span>
      </p>
    </section>
  );
}
