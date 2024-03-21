import Image from "next/image";
import React, { useState } from "react";
import TrackDetailsInput from "./track-details-input";
import { BiCamera } from "react-icons/bi";

interface UploadDetailsProps {
    uploading: boolean;
    defaultSongName: string;
}

const previewStyles: React.CSSProperties = {
    maxWidth: "100%",
    maxHeight: "200px",
    marginTop: "10px",
};

const UploadDetails: React.FC<UploadDetailsProps> = ({ uploading, defaultSongName }) => {
    const [songName, setSongName] = useState(defaultSongName);
    const [bpm, setBpm] = useState("");
    const [songKey, setSongKey] = useState("");
    const [genre, setGenre] = useState("");
    const [tags, setTags] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImage(file || null);
    };

    return (
        <div className="flex flex-col p-20 rounded-sm border-2 border-dashed border-white w-full lg:w-6/12">
            <h2 className="font-semibold text-white text-[30px] mb-4 underline underline-offset-4">Track Details</h2>
            <div className="flex flex-col w-full items-center lg:items-start lg:flex-row">
                {/* IMAGE */}
                <div className="relative w-[260px] h-[260px] aspect-square border-black bg-gradient-to-br from-black via-blue-900 to-black">
                    {/* Upload image portion */}
                    <label className="absolute bottom-4 flex mx-auto text-center w-full justify-center">
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
                        <div>
                            <Image
                                width={75}
                                height={75}
                                className="aspect-square"
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                style={previewStyles}
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
            {/* Add a loading bar here for file upload progress */}
        </div>
    );
};

export default UploadDetails;
