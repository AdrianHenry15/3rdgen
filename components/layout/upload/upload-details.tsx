import Image from "next/image";
import React, { useState } from "react";
import TrackDetailsInput from "./track-details-input";
import { BiCamera } from "react-icons/bi";

interface UploadDetailsProps {
    processing: boolean;
    defaultSongName: string;
    onProcessingChange: (processing: boolean) => void; // Callback to update processing state
}

const UploadDetails: React.FC<UploadDetailsProps> = ({ processing, defaultSongName, onProcessingChange }) => {
    const [songName, setSongName] = useState(defaultSongName);
    const [bpm, setBpm] = useState("");
    const [songKey, setSongKey] = useState("");
    const [genre, setGenre] = useState("");
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [preparationProgress, setPreparationProgress] = useState<number>(0); // State for preparation progress
    const [processingComplete, setProcessingComplete] = useState<boolean>(false); // State to track processing completion

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImage(file || null);
    };

    // Function to handle cancel
    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel?")) {
            onProcessingChange(false); // Update processing state
        }
    };

    // Function to simulate preparation progress
    const prepareUpload = () => {
        setLoading(true);
        // Simulate preparation progress
        const timer = setInterval(() => {
            setPreparationProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(timer);
                    // Perform actual upload here
                    console.log("Preparation complete. Starting upload...");
                    setLoading(false);
                    setProcessingComplete(true);
                    return 100;
                }
                return prevProgress + 10;
            });
        }, 500); // Update progress every 500ms
    };

    return (
        <div className="flex flex-col w-full h-full">
            {/* PROGRESS BAR */}
            {/* <div className="w-full h-full flex flex-col"> */}
            {/* Show the current song being processed */}
            {/* <p className="text-white text-sm">{defaultSongName}</p> */}
            {/* Add a loading bar here for file upload progress */}
            {/* <progress
                    className={`w-full ${processingComplete ? "bg-blue-500" : ""}`} // Conditionally apply background color based on processing completion
                    value={preparationProgress}
                    max={100}
                    style={{ visibility: uploading ? "visible" : "hidden" }}
                /> */}
            {/* </div> */}

            <div className="flex flex-col p-20 rounded-sm border-2 border-dashed border-white w-full lg:w-6/12">
                <h2 className="font-semibold text-white text-[30px] mb-14 underline underline-offset-4">Track Details</h2>
                <div className="flex flex-col w-full items-center lg:items-start lg:flex-row">
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
                                    src={URL.createObjectURL(image)}
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
                        <TrackDetailsInput label="Genre:" htmlFor="genre" placeHolder="Genre" songName={genre} setSongName={setGenre} />
                        <TrackDetailsInput label="Tags:" htmlFor="tags" placeHolder="Tags" songName={tags} setSongName={setTags} />
                    </div>
                </div>
                {/* BUTTONS */}
                <div className="flex justify-center lg:justify-start mt-8">
                    {/* Cancel Button */}
                    <button
                        onClick={handleCancel}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mr-4"
                    >
                        Cancel
                    </button>

                    {/* Upload Button */}
                    <button
                        onClick={prepareUpload}
                        className={`bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadDetails;
