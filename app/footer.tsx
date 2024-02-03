import Image from "next/image";
import { fetchSocialLinks } from "./lib/data";
import Link from "next/link";
import dotenv from "dotenv";

dotenv.config();

export default async function Footer() {
  const socialLinks = await fetchSocialLinks();
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "";

  return (
    <footer className="w-screen text-center">
      <div className="flex flex-col justify-center items-center h-full">
        <span className="mt-3">
          {socialLinks.map((socialLink, i) => {
            return (
              <Link
                href={socialLink.url}
                key={i}
                className="social-link h-8 w-8 inline-block align-middle text-center aspect-square rounded-full leading-7 mx-3"
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
            className="social-link h-8 w-8 inline-block align-middle text-center aspect-square rounded-full leading-7 mx-3"
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
        <span className="mt-3 text-xs">
          <span className="border-l-white">
            © {new Date().getFullYear()} Johannes Bernet
          </span>
        </span>
      </div>
    </footer>
  );
}
