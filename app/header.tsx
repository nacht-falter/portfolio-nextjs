"use client";

import Link from "next/link";
import { montserrat } from "./ui/fonts";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [animationFinished, setAnimationFinished] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationFinished(true);
    }, 7000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const logo = (
    <Image
      src="/nacht-falter_large_shadow.svg"
      alt="nacht-falter logo"
      width={35}
      height={35}
      className="inline-block align-middle logo"
    />
  );

  return (
    <header className="flex justify-center items-center overflow-x-clip pt-10">
      <div
        className={`${animationFinished ? "hidden" : ""} flex w-full h-0 absolute top-0 animation-cols`}
      >
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
      </div>
      <Link
        href="/"
        className={`${animationFinished ? "main-title-link" : ""}`}
      >
        <h1
          className={`${montserrat.className} antialiased flex-col md:flex-row flex items-center`}
        >
          <span className="md:hidden flex items-center justify-center aspect-square p-1 rounded-full logo-bg w-9 h-9 mb-2">
            {logo}
          </span>
          <span className="main-title uppercase text-right text-2xl md:text-3xl md:text-4xl xl:text-5xl font-extrabold">
            Johannes Bernet
          </span>
          <span className="hidden md:flex items-center justify-center aspect-square p-1.5 rounded-full logo-bg mx-3 w-11 h-11">
            {logo}
          </span>
          <span className="text-xl md:text-2xl md:text-3xl lg:text-4xl font-extrabold text-left subtitle">
            Software Developer
          </span>
        </h1>
      </Link>
    </header>
  );
}
