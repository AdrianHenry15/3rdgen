"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

import UserFill from "@/public/misc/user.png";
import { PiPlusCircleDuotone } from "react-icons/pi";

const MobileUserIcon = () => {
    const { user, isLoaded } = useUser();
    const image = !isLoaded || !user?.hasImage ? UserFill : user.imageUrl;

    return (
        <div className="flex flex-col relative">
            <span>
                <Image src={image} alt="user-icon" width={100} height={100} className="rounded-full" />
            </span>
            <span className="p-1 rounded-full bg-black absolute bottom-0 left-16 cursor-pointer">
                <PiPlusCircleDuotone size={25} className="bg-blue-500 rounded-full" />
            </span>
        </div>
    );
};

export default MobileUserIcon;
