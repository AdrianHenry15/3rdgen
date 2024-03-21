"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadDetails from "./upload-details";

const Upload: React.FC = () => {
    const [tracks, setTracks] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [defaultSongName, setDefaultSongName] = useState("");

    const preprocessSongName = (fileName: string) => {
        // Remove dashes and capitalize the start of each word
        return fileName.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newTracks = acceptedFiles.map((file) => {
            const parts = file.name.split("-");
            return parts[0];
        });
        setTracks((prevTracks) => [...prevTracks, ...newTracks]);
        setUploading(true); // Set uploading to true when files are dropped

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
        <div className="md:flex md:justify-evenly">
            {!uploading && (
                <div {...getRootProps()} style={dropzoneStyles}>
                    <input {...getInputProps()} />
                    {isDragActive ? <p>Drop the files here...</p> : <p>Drag n drop some audio files here, or click to select files</p>}
                </div>
            )}
            {tracks.length > 0 && <UploadDetails defaultSongName={defaultSongName} uploading={uploading} />}
        </div>
    );
};

const dropzoneStyles: React.CSSProperties = {
    border: "2px dashed #ccc",
    borderRadius: "4px",
    padding: "100px",
    textAlign: "center",
    cursor: "pointer",
    marginBottom: "20px",
};

export default Upload;
