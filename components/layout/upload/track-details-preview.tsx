"use client";

import React from "react";
import { UploadSequence } from "./upload";
import Image from "next/image";
import Plane from "@/public/music/backdrops/plane-backdrop.jpg";

interface ITrackDetailsPreviewProps {
    setUploadSequence: (uploadSequence: UploadSequence) => void;
    songName: string;
    bpm: string;
    songKey: string;
    img: any;
}

const TrackDetailsPreview: React.FC<ITrackDetailsPreviewProps> = ({ setUploadSequence, img, songName, bpm, songKey }) => {
    const image = img ? img : Plane;
    return (
        <div className="flex my-2">
            {/* IMAGE */}
            <span>
                <Image className="aspect-square object-cover w-[80px] mr-2" width={1000} height={1000} src={image} alt="track-img" />
            </span>
            {/* NAME AND STUFF */}
            <div className="flex flex-col">
                <h5 className="text-white text-sm">{songName}</h5>
                <div className="flex">
                    <p className="text-sm text-zinc-500">{`${bpm} ${songKey}`}</p>
                </div>
                <div className="flex flex-col items-start mt-2">
                    <button onClick={() => setUploadSequence(UploadSequence.PROCESSING)} className="text-sm mr-2 text-red-500">
                        Edit
                    </button>
                    <button onClick={() => {}} className="text-sm mr-2 text-green-500">
                        Finish Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrackDetailsPreview;
