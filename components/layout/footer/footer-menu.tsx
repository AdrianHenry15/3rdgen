"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavMenuTypeAltItems, NavMenuTypeItems } from "@/lib/constants";

const FooterMenu = () => {
    const pathname = usePathname();
    return (
        <nav className="text-gray-400 text-sm flex-1 md:text-left">
            <h5 className="font-light text-2xl tracking-wider text-white">Company</h5>
            <ul className="text-xs flex">
                <div>
                    {NavMenuTypeItems.map((item) => {
                        return (
                            <li key={item.title} className={`${pathname === item.link ? "underline" : ""} my-4`}>
                                <Link href={item.link}>{item.title}</Link>
                            </li>
                        );
                    })}
                </div>
                <div>
                    {NavMenuTypeAltItems.map((item) => {
                        return (
                            <li className={`${pathname === item.link ? "underline" : ""} my-4 mx-4`} key={item.title}>
                                <Link href={item.link}>{item.title}</Link>
                            </li>
                        );
                    })}
                </div>
            </ul>
        </nav>
    );
};

export default FooterMenu;
