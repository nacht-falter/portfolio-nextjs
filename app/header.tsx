"use client";

import Link from "next/link";
import { montserrat } from "./ui/fonts";
import { useEffect, useState } from "react";

export default function Header() {
  const [animationFinished, setAnimationFinished] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationFinished(true);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <header className="flex justify-center items-center overflow-x-clip">
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
      <Link href="/" className={`${animationFinished ? "main-title-link" : ""}`}>
        <h1
          className={`${montserrat.className} antialiased text-3xl md:text-4xl lg:text-5xl mt-3 flex items-center`}
        >
          <span className="main-title uppercase text-right font-extrabold border-white border-r-2">
            Johannes Bernet
          </span>
          <span className="text-xl md:text-2xl lg:text-3xl font-extrabold text-left subtitle">
            Software Developer
          </span>
        </h1>
      </Link>
    </header>
  );
}
