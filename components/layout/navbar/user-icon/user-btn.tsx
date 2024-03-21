"use client";

import React, { Fragment } from "react";
import Image from "next/image";
import { useClerk, useUser } from "@clerk/nextjs";
import { Popover, Transition } from "@headlessui/react";

import { PiGearSixLight, PiSignOut } from "react-icons/pi";

import UserPopoverPanelItem from "./user-popover-panel-item";

const UserBtn = () => {
    const { user, isSignedIn } = useUser();
    const { signOut } = useClerk();

    return (
        <div className="top-16 w-full max-w-sm flex text-center h-full mx-4">
            <Popover className="relative flex items-center">
                {({ close }) => (
                    <>
                        <Popover.Button>
                            {isSignedIn && (
                                <span className="flex items-center justify-center hover:bg-zinc-500 hover:scale-125 hover:rounded-full transition-all duration-300 ease-in-out">
                                    <Image className="rounded-full" width={25} height={25} src={user!.imageUrl} alt="user-image" />
                                </span>
                            )}
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-10 mt-1 w-screen max-w-sm translate-y-[105px] -translate-x-[350px] md:-translate-x-[360px] transform ml-4">
                                <div className="flex flex-col relative rounded-lg shadow-lg shadow-black bg-white p-6">
                                    <div className="flex items-center mb-4">
                                        <span className="mr-4 flex items-center">
                                            <Image
                                                className="rounded-full flex items-center"
                                                width={40}
                                                height={40}
                                                src={user!.imageUrl}
                                                alt="user-image"
                                            />
                                        </span>
                                        <div>
                                            <div className="flex items-center">
                                                <p className="text-black mr-1">{user?.firstName}</p>
                                                <p className="text-black">{user?.lastName}</p>
                                            </div>
                                            <p>{user?.primaryEmailAddress?.emailAddress}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <UserPopoverPanelItem
                                            onClick={close}
                                            icon={<PiGearSixLight className="text-gray-500" size={15} />}
                                            page={{
                                                title: "My Profile",
                                                link: "/profile",
                                            }}
                                        />
                                        <UserPopoverPanelItem
                                            onClick={signOut}
                                            icon={<PiSignOut className="text-gray-500" size={15} />}
                                            page={{
                                                title: "Sign Out",
                                                link: "/",
                                            }}
                                        />
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default UserBtn;
