"use client";

import React, { useEffect, useState } from "react";
import { UploadSequence } from "./upload";
import Image from "next/image";
import { getImageURL } from "helpers/image-api-operations";
import Plane from "@/public/music/backdrops/plane-backdrop.jpg";

interface ITrackDetailsPreviewProps {
    setUploadSequence: (uploadSequence: UploadSequence) => void;
    songName: string;
    bpm: string;
    songKey: string;
    genre: string;
    img: any;
}

const TrackDetailsPreview: React.FC<ITrackDetailsPreviewProps> = ({ setUploadSequence, img, songName, bpm, songKey, genre }) => {
    const image = img ? img : Plane;
    return (
        <div className="flex">
            {/* IMAGE */}
            <span>
                <Image className="aspect-square object-cover w-[80px] mr-2" width={1000} height={1000} src={image} alt="track-img" />
            </span>
            {/* NAME AND STUFF */}
            <div className="flex flex-col">
                <h5 className="text-white text-sm">{songName}</h5>
                <div className="flex">
                    <p className="text-sm text-zinc-500">{`${bpm} ${songKey} ${genre}`}</p>
                </div>
                <div className="flex mt-2">
                    <p onClick={() => setUploadSequence(UploadSequence.PROCESSING)} className="text-sm mr-2 text-red-500">
                        Edit
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TrackDetailsPreview;
