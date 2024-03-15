"use client";

import { clerkClient, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { BiChevronLeft } from "react-icons/bi";

const EditProfile = () => {
    const { control } = useForm();
    const { user } = useUser();

    return <div></div>;
};

export default EditProfile;
