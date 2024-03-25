"use client";

import Image from "next/image";
import React, { useState } from "react";

import TrackDetailsInput from "./track-details-input";
import { BiCamera } from "react-icons/bi";
import TrackDetailsPreview from "./track-details-preview";
import { UploadSequence } from "./upload";

interface UploadDetailsProps {
    uploadSequence: UploadSequence;
    setUploadSequence: (uploadSequence: UploadSequence) => void; // Callback to update processing state
    defaultSongName: string;
    onCancel: () => void;
    // songCount: number; // Total count o songs being tracked
    // trackIndex: number; // Index of current song being processed
}

const UploadDetails: React.FC<UploadDetailsProps> = ({ uploadSequence, defaultSongName, setUploadSequence, onCancel }) => {
    const [songName, setSongName] = useState(defaultSongName);
    const [bpm, setBpm] = useState("");
    const [songKey, setSongKey] = useState("");
    const [image, setImage] = useState<any | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Once the file is loaded, set the result (data URL) to the component's state
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to handle cancel
    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel?")) {
            onCancel();
        }
    };

    const save = () => {
        setUploadSequence(UploadSequence.SAVED);
    };

    return uploadSequence === UploadSequence.SAVED ? (
        <div className="h-screen">
            <TrackDetailsPreview
                setUploadSequence={() => setUploadSequence(UploadSequence.PROCESSING)}
                songName={songName}
                bpm={bpm}
                songKey={songKey}
                img={image}
            />
        </div>
    ) : (
        <div className="flex flex-col w-full h-full items-center my-4">
            <div className="flex flex-col rounded-sm border-2 border-dashed border-white w-full p-4 md:p-20 lg:w-[1000px]">
                <h2 className="font-semibold text-white text-[30px] mb-14 text-center md:text-start">Track Details</h2>
                <div className="flex flex-col w-full items-center md:items-start lg:flex-row">
                    {/* IMAGE */}
                    <div className="relative w-[260px] h-[260px] aspect-square border-black bg-gradient-to-br from-black via-blue-900 to-black">
                        {/* Upload image portion */}
                        <label className="z-20 absolute bottom-4 flex mx-auto text-center w-full justify-center">
                            <div className="bg-white flex items-center text-black px-4 py-2 rounded-md cursor-pointer text-sm">
                                <BiCamera className="mr-2" size={17} />
                                <h5>Upload Image</h5>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="opacity-0 absolute top-0 left-0 h-full w-full cursor-pointer"
                                onChange={handleImageChange}
                            />
                        </label>
                        {/* Display image preview if an image is selected */}
                        {image ? (
                            <div className="w-full flex h-full relative">
                                <Image
                                    width={75}
                                    height={75}
                                    className="aspect-square w-full h-full object-cover"
                                    src={image}
                                    alt="Preview"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-full"></div>
                        )}
                    </div>
                    <div className="flex flex-col w-full my-4 lg:my-0 lg:ml-4">
                        <TrackDetailsInput
                            label="Song Name:"
                            htmlFor="song-name"
                            placeHolder="Song Name"
                            songName={songName}
                            setSongName={setSongName}
                        />
                        <TrackDetailsInput label="Bpm:" htmlFor="bpm" placeHolder="Bpm" songName={bpm} setSongName={setBpm} />
                        <TrackDetailsInput
                            label="Song Key:"
                            htmlFor="song-key"
                            placeHolder="Song Key"
                            songName={songKey}
                            setSongName={setSongKey}
                        />
                    </div>
                </div>
                {/* BUTTONS */}
                <div className="flex justify-center mt-8">
                    {/* Cancel Button */}
                    <button
                        onClick={handleCancel}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mr-4"
                    >
                        Cancel
                    </button>

                    {/* Upload Button */}
                    <button
                        onClick={save}
                        className={`bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md 
                            `}
                    >
                        Save
                    </button>
                </div>
            </div>
            {/* Footer */}
            {/* <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
                    <div>{`Songs: ${songCount}`}</div>
                    <div>{`Current Song: ${trackIndex + 1}`}</div> 
                </div> */}
        </div>
    );
};

export default UploadDetails;
