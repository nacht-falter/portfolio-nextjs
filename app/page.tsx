import Image from "next/image";
import { josefin_sans, source_sans } from "./ui/fonts";
import Link from "next/link";
import { FaScrewdriverWrench, FaLinkedinIn, FaGithub } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6 font-light text-center items-center mt-20">
      <Image
        src="/nacht-falter_circle_512x512.png"
        alt="nacht-falter logo"
        width={200}
        height={200}
      />
      <h1
        className={`${source_sans.className} antialiased text-4xl mt-3 font-thin flex flex-col lg:flex-row lg:items-center`}
      >
        <span className="lg:mr-2">Johannes Bernet</span>
        <span className="hidden lg:inline-block lg:mx-2">|</span>
        <span className="text-xl lg:text-4xl lg:ml-2">
          Full-Stack Software Developer
        </span>
      </h1>

      <div
        className={`${josefin_sans.className} antialiased text-lg mt-3 flex-col flex text-center items-center`}
      >
        <p>
          <FaScrewdriverWrench className="text-2xl lg:text-3xl mt-6" />
        </p>
        <p className="mt-3">This website is under construction.</p>
        <p className="mt-3">
          Please check out my LinkedIn and GitHub profiles in the meantime.
        </p>
        <p className="flex space-x-4 mt-3">
          <Link
            href="https://www.linkedin.com/in/johannes-bernet"
            title="LinkedIn"
            className="flex items-center text-blue-700 hover:text-blue-500"
          >
            <FaLinkedinIn className="me-1" />
            <span>LinkedIn</span>
          </Link>
          <Link
            href="https://www.github.com/nacht-falter"
            title="GitHub"
            className="flex items-center text-blue-700 hover:text-blue-500"
          >
            <FaGithub className="me-1" />
            <p>GitHub</p>
          </Link>
        </p>
      </div>
    </main>
  );
}
