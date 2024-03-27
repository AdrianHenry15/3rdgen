import React from "react";
import Image from "next/image";

interface ITrackDetailsPreviewProps {
    setUploadSequence: () => void;
    songName: string;
    bpm: string;
    songKey: string;
    img: any;
}

const TrackDetailsPreview: React.FC<ITrackDetailsPreviewProps> = ({ setUploadSequence, img, songName, bpm, songKey }) => {
    return (
        <div className="flex my-2">
            {/* IMAGE */}
            {img && typeof img === "string" && img.trim() !== "" ? (
                <span>
                    <Image className="aspect-square object-cover w-[80px] mr-2" width={1000} height={1000} src={img} alt="track-img" />
                </span>
            ) : (
                <div></div>
            )}
            {/* NAME AND STUFF */}
            <div className="flex flex-col">
                <h5 className="text-white text-sm">{songName}</h5>
                <div className="flex">
                    <p className="text-sm text-zinc-500">{`${bpm} ${songKey}`}</p>
                </div>
                <div className="flex flex-col items-start mt-2">
                    <button onClick={setUploadSequence} className="text-sm mr-2 text-red-500">
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
