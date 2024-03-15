"use client";

import React from "react";
import MobileUserIcon from "./mobile-user-icon";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const MobileProfile = () => {
    const { user } = useUser();

    return (
        <div className="w-full items-center flex flex-col p-4">
            {/* PROFILE PICTURE | TODO: USER APP INFO */}
            <MobileUserIcon />
            {/* NAME */}
            <div className="flex flex-col items-center w-full">
                <div className="flex w-full flex-col md:w-[450px]">
                    <div className="flex flex-col h-min w-full">
                        <h5 className="text-white font-semibold">{`${user?.firstName} ${user?.lastName}`}</h5>
                        <p>{user?.primaryEmailAddress?.emailAddress}</p>
                        <p>{user?.primaryPhoneNumber?.phoneNumber}</p>
                    </div>

                    {/* EDIT PROFILE | TODO: SHARE PROFILE */}
                    <div className="flex items-start w-full h-min my-4">
                        <Link
                            href={"/profile/edit"}
                            className="bg-gray-300 flex justify-center items-center flex-1 py-1 rounded-lg mx-1 font-semibold text-sm cursor-pointer"
                        >
                            <h5>Edit Profile</h5>
                        </Link>

                        <Link
                            className="bg-gray-300 flex justify-center items-center flex-1 py-1 rounded-lg mx-1 font-semibold text-sm"
                            href={"/upload/songs"}
                        >
                            <h5>Upload Songs</h5>
                        </Link>
                    </div>
                </div>
                {/* USER TRACK CATEGORIES */}
                <div className="flex flex-col w-full">
                    <h5 className="font-semibold text-[30px] border-b-[1px] border-gray-500 text-start text-white">Tracks</h5>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default MobileProfile;
