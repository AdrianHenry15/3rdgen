"use client";

import React, { useState } from "react";

import OpenButton from "./open-button";
import OpenLinkModal from "../modals/open-link-modal";

import { Category } from "@/lib/types";
import { useRouter } from "next/navigation";

interface IActionOverlayProps {
    websiteLink: string;
    websiteTitle: string;
    currentItemId: string;
    currentCategory: Category;
    currentItemTitle: string;
    currentItemImg: any;
    currentAudioFile?: string;
    currentArtistName?: string;
}

const ActionOverlay = (props: IActionOverlayProps) => {
    const [isWebsiteModalOpen, setWebsiteModalOpen] = useState(false);
    const router = useRouter();

    const openWebsite = () => {
        setWebsiteModalOpen(true);
    };

    const closeWebsiteModal = () => {
        setWebsiteModalOpen(false);
    };

    const handleAction = () => {
        if (props.currentCategory === Category.TRACK) {
            console.log("song");
        } else if (props.currentCategory === Category.WEBSITE) {
            openWebsite();
        } else if (props.currentCategory === Category.MOVIE) {
            console.log("movie");
        } else if (props.currentCategory === Category.ARTIST) {
            router.push(`/music/artists/${props.currentItemId}`);
        }
    };
    return (
        <div className="absolute cursor-pointer top-0 left-0 w-full h-full bg-black/20 text-white">
            {/* OPEN ITEM */}
            <OpenButton onClick={handleAction} />

            {/* OpenLinkModal */}
            {isWebsiteModalOpen && (
                <OpenLinkModal isOpen={true} closeModal={closeWebsiteModal} title={props.websiteTitle!} link={props.websiteLink!} />
            )}
        </div>
    );
};

export default ActionOverlay;
