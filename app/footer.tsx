import Image from "next/image";
import { getSocialLinks } from "./lib/data";
import Link from "next/link";

export default async function Footer() {
  const socialLinks = await getSocialLinks();

  return (
    <footer className="fixed bottom-0 w-screen text-center">
      <div className="flex justify-center items-center h-full">
        {socialLinks.map((socialLink, i) => {
          return (
            <Link
              href={socialLink.url}
              key={i}
              className="social-link h-8 w-8 inline-block align-middle text-center aspect-square rounded-full leading-7 mx-3"
            >
              <Image
                src={`https://cdn.simpleicons.org/${socialLink.icon}`}
                alt={socialLink.name}
                width={15}
                height={15}
                className="inline"
                title={socialLink.name}
              />
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
