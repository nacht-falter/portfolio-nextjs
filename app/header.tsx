"use client";

import Link from "next/link";
import { montserrat } from "./ui/fonts";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [animationFinished, setAnimationFinished] = useState<boolean>(false);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setAnimationFinished(true);
    }, 6000);

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    scrollToTop();

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(animationTimeout);
      window.removeEventListener("scroll", handleScroll);
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
          <span className="main-title uppercase text-right text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold">
            Johannes Bernet
          </span>
          <span className="hidden md:flex items-center justify-center aspect-square p-1.5 rounded-full logo-bg mx-3 w-11 h-11">
            {logo}
          </span>
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-left subtitle">
            Software Developer
          </span>
        </h1>
      </Link>
      <button
        onClick={scrollToTop}
        className={`${(showScrollButton && "opacity-100") || "opacity-0"} rounded-full bottom-0 m-6 p-2 aspect-square flex items-center text-lg go-up-button`}
        title="Scroll to top"
      >
        <ArrowUpIcon className="h-4 w-4 text-white" />
      </button>
    </header>
  );
}
