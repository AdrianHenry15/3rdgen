"use client";

import React, { useState, useEffect } from "react";
import MobileUserIcon from "./mobile-user-icon";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const MobileProfile = () => {
    const { user } = useUser();
    const [editProfile, setEditProfile] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
            setEmail(user.primaryEmailAddress?.emailAddress || "");
            setPhone(user.primaryPhoneNumber?.phoneNumber || "");
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        try {
            await user?.update({
                firstName: firstName,
                lastName: lastName,
                primaryEmailAddressId: email,
                primaryPhoneNumberId: phone,
            });
            setEditProfile(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="w-full items-center flex flex-col p-4">
            {/* PROFILE PICTURE | TODO: USER APP INFO */}
            <MobileUserIcon />
            {/* NAME */}
            <div className="flex flex-col items-center w-full">
                <div className="flex w-full flex-col md:w-[450px]">
                    {editProfile ? (
                        <>
                            <input
                                className="text-black"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                disabled={!editProfile}
                            />
                            <input
                                className="text-black"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                disabled={!editProfile}
                            />
                            <input
                                className="text-black"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!editProfile}
                            />
                            <input
                                className="text-black"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={!editProfile}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col h-min w-full">
                            <h5 className="text-white font-semibold">{`${user?.firstName} ${user?.lastName}`}</h5>
                            <p>{user?.primaryEmailAddress?.emailAddress}</p>
                            <p>{user?.primaryPhoneNumber?.phoneNumber}</p>
                        </div>
                    )}
                    {/* EDIT PROFILE | TODO: SHARE PROFILE */}
                    <div className="flex items-start w-full h-min my-4">
                        {editProfile ? (
                            <span
                                className="bg-gray-300 flex justify-center items-center flex-1 py-1 rounded-lg mx-1 font-semibold text-sm cursor-pointer"
                                onClick={handleUpdateProfile}
                            >
                                <h5>Save</h5>
                            </span>
                        ) : (
                            <span
                                className="bg-gray-300 flex justify-center items-center flex-1 py-1 rounded-lg mx-1 font-semibold text-sm cursor-pointer"
                                onClick={() => setEditProfile(true)}
                            >
                                <h5>Edit Profile</h5>
                            </span>
                        )}
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
