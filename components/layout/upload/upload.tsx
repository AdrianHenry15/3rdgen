"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadDetails from "./upload-details";

const Upload: React.FC = () => {
    const [tracks, setTracks] = useState<string[]>([]);
    const [processing, setProcessing] = useState(false);
    const [defaultSongName, setDefaultSongName] = useState("");

    const preprocessSongName = (fileName: string) => {
        // Remove dashes and capitalize the start of each word
        return fileName.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // Function to handle processing change
    const handleProcessingChange = (processing: boolean) => {
        setProcessing(processing);
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newTracks = acceptedFiles.map((file) => {
            const parts = file.name.split("-");
            return parts[0];
        });
        setTracks((prevTracks) => [...prevTracks, ...newTracks]);
        setProcessing(true); // Set uploading to true when files are dropped

        // Set default song name to the name of the first accepted audio file
        if (acceptedFiles.length > 0) {
            const fileName = acceptedFiles[0].name;
            const songNameWithoutExtension = fileName.substring(0, fileName.lastIndexOf(".")); // Extract file name without extension
            const processedSongName = preprocessSongName(songNameWithoutExtension);
            setDefaultSongName(processedSongName);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="relative md:flex md:justify-evenly">
            {!processing && (
                <div className="h-screen flex justify-center items-center">
                    <div
                        {...getRootProps()}
                        className="border-dashed border-2 border-white rounded-md p-[100px] text-center cursor-pointer mb-20"
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? <p>Drop the files here...</p> : <p>Drag n drop some audio files here, or click to select files</p>}
                    </div>
                </div>
            )}
            {tracks.length > 0 && processing && (
                <UploadDetails defaultSongName={defaultSongName} processing={processing} onProcessingChange={handleProcessingChange} />
            )}
        </div>
    );
};

export default Upload;
