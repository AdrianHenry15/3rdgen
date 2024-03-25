"use client";

import { useEffect, useRef } from "react";

import Link from "next/link";

export default function HomePage() {
    const LinkClass =
        "text-white transition-all duration-300 ease-in-out hover:scale-105 hover:text-red-600 font-bold text-xl md:text-[30px] lg:text-[75px]";
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const options = {
            threshold: 0.1, // Adjust the threshold as needed (percentage of element visibility)
        };

        const callback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    containerRef.current?.classList.add("show");
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect(); // Cleanup observer on component unmount
    }, []);

    return (
        <section className="bg-black flex flex-col">
            {/* SPLASH */}
            {/* <HomeSplash /> */}
            <div ref={containerRef} className="flex h-full items-center justify-evenly md:items-center">
                <Link
                    className={`bg-gradient-to-br from-red-500 via-black to-black py-[25%] justify-center w-full flex-1 flex`}
                    href={"/websites"}
                >
                    <h1 className={`${LinkClass}`}>Websites</h1>
                </Link>
                <Link className="bg-gradient-to-br from-black via-black to-red-500 py-[25%] flex flex-1 justify-center" href={"/music"}>
                    <h1 className={`${LinkClass}`}>Music</h1>
                </Link>
            </div>
        </section>
    );
}
