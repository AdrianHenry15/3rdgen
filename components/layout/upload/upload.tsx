"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadDetails from "./upload-details";

interface TrackDetails {
    id: number;
    songName: string;
    processing: boolean;
    defaultSongName: string;
}

const Upload: React.FC = () => {
    const [tracks, setTracks] = useState<TrackDetails[]>([]);
    const [nextTrackId, setNextTrackId] = useState(1); // To generate unique IDs for tracks

    const preprocessSongName = (fileName: string) => {
        // Remove dashes and capitalize the start of each word
        return fileName.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const handleProcessingChange = (id: number, processing: boolean) => {
        setTracks((prevTracks) => prevTracks.map((track) => (track.id === id ? { ...track, processing } : track)));
    };

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            acceptedFiles.forEach((file) => {
                const parts = file.name.split("-");
                const songName = parts[0];
                const defaultSongName = preprocessSongName(songName);
                setTracks((prevTracks) => [
                    ...prevTracks,
                    {
                        id: nextTrackId,
                        songName,
                        processing: true,
                        defaultSongName,
                    },
                ]);
                setNextTrackId((prevId) => prevId + 1);
            });
        },
        [nextTrackId]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="relative flex justify-evenly flex-col">
            {/* DRAG AND DROP */}
            {!tracks.some((item) => item.processing) && (
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
            {/* TRACK DETAILS */}
            {tracks.map((track, index) =>
                !track.processing ? (
                    <UploadDetails
                        key={track.id}
                        defaultSongName={track.defaultSongName}
                        processing={track.processing}
                        setProcessing={(processing) => handleProcessingChange(track.id, processing)}
                        songCount={tracks.length}
                        trackIndex={index}
                    />
                ) : null
            )}
        </div>
    );
};

export default Upload;
