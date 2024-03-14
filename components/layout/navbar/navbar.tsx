"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

import Logo from "@/public/logos/thirdgenstudios-logo.png";
import { NavMenuTypeItems } from "@/lib/constants";
import { NavMenuType } from "@/lib/types";
import Button from "@/components/button";
import MobileMenu from "./mobile-menu";
import Cart from "../cart/cart";

const UserIcon = dynamic(() => import("@/components/layout/navbar/user-icon/user-icon"), { ssr: false });

interface INavbarProps {
    className?: string;
}

export default function Navbar(props: INavbarProps) {
    const pathname = usePathname();

    return (
        <nav
            className={`${props.className} text-sm whitespace-nowrap font-semibold flex w-full self-center bg-black sticky top-0 z-50 py-2`}
        >
            {/* MOBILE CONTAINER */}
            <div className="absolute self-center flex flex-1 left-0 xl:hidden">
                {/* <MobileMenu /> */}
                <MobileMenu />
            </div>
            {/* TITLE & LINKS  */}
            <div className="flex w-full my-2 justify-evenly">
                <div className="flex items-center">
                    <Link href="/" className="flex-1 flex lg:mr-10">
                        {/* TODO: LOGO */}
                        <Image className="" src={Logo} alt="logo" width={200} />
                    </Link>
                    {/* LINKS  */}
                    <ul className="hidden text-white items-center xl:flex">
                        {NavMenuTypeItems.map((item: NavMenuType) => (
                            <li
                                className={`mx-2 transition-all duration-300 ease-in-out hover:text-red-700 hover:underline ${
                                    pathname === item.link ? "underline" : ""
                                }`}
                                key={item.title}
                            >
                                <Link href={item.link} className="">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* NAV BUTTONS */}
                <ul className="hidden items-center xl:flex">
                    <Link href={"/contact-us"}>
                        <Button roundedFull name="Contact Us" altColor />
                    </Link>
                    <Link href={"/estimate"}>
                        <Button className="animate-pulse mx-4" roundedFull name="Get Your Free Estimate" />
                    </Link>
                </ul>
                {/* USER ICON */}
                <div className="flex items-center absolute top-1 right-4 md:top-1 md:right-1 xl:relative">
                    <div className="flex items-center lg:mb-1">
                        <Cart />
                    </div>
                    <div className="hidden md:flex">
                        <UserIcon />
                    </div>
                </div>
            </div>
        </nav>
    );
}
