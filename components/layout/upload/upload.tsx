"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadDetails from "./upload-details";

const Upload: React.FC = () => {
    const [tracks, setTracks] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newTracks = acceptedFiles.map((file) => {
            const parts = file.name.split("-");
            return parts[0];
        });
        setTracks((prevTracks) => [...prevTracks, ...newTracks]);
        setUploading(true); // Set uploading to true when files are dropped
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div>
            {!uploading && (
                <div {...getRootProps()} style={dropzoneStyles}>
                    <input {...getInputProps()} />
                    {isDragActive ? <p>Drop the files here...</p> : <p>Drag n drop some audio files here, or click to select files</p>}
                </div>
            )}
            {tracks.length > 0 && <UploadDetails uploading={uploading} />}
        </div>
    );
};

const dropzoneStyles: React.CSSProperties = {
    border: "2px dashed #ccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    marginBottom: "20px",
};

export default Upload;
