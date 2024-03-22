import React from "react";
import { UploadSequence } from "./upload";

interface ITrackDetailsPreviewProps {
    setUploadSequence: (uploadSequence: UploadSequence) => void;
    songName: string;
    bpm: string;
    songKey: string;
    genre: string;
    tags: string;
}

const TrackDetailsPreview: React.FC<ITrackDetailsPreviewProps> = ({ setUploadSequence, songName, bpm, songKey, genre, tags }) => {
    return (
        <div className="h-screen">
            <div className="mt-8">
                <h3 className="text-white text-lg font-semibold mb-4">Track Preview</h3>
                <div className="flex items-center mb-2">
                    <span className="text-white mr-2">Song Name:</span>
                    <span className="text-gray-300">{songName}</span>
                </div>
                <div className="flex items-center mb-2">
                    <span className="text-white mr-2">Bpm:</span>
                    <span className="text-gray-300">{bpm}</span>
                </div>
                <div className="flex items-center mb-2">
                    <span className="text-white mr-2">Song Key:</span>
                    <span className="text-gray-300">{songKey}</span>
                </div>
                <div className="flex items-center mb-2">
                    <span className="text-white mr-2">Genre:</span>
                    <span className="text-gray-300">{genre}</span>
                </div>
                <div className="flex items-center mb-4">
                    <span className="text-white mr-2">Tags:</span>
                    <span className="text-gray-300">{tags}</span>
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={() => setUploadSequence(UploadSequence.PROCESSING)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-4"
                    >
                        Edit
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">Go to Track</button>
                </div>
            </div>
        </div>
    );
};

export default TrackDetailsPreview;
