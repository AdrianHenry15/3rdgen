"use client";

// Importing necessary modules from React and react-dropzone
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadDetails from "./upload-details"; // Importing UploadDetails component

export enum UploadSequence {
    NONE,
    PROCESSING,
    UPLOADED,
    EDITTING,
}

// Interface for defining track details
interface TrackDetails {
    id: number;
    songName: string;
    uploadSequence: UploadSequence;
    defaultSongName: string;
}

// Functional component for uploading tracks
const Upload: React.FC = () => {
    // State variables for managing tracks and generating unique IDs
    const [tracks, setTracks] = useState<TrackDetails[]>([]);
    const [nextTrackId, setNextTrackId] = useState(1); // To generate unique IDs for tracks

    // Function to preprocess song name
    const preprocessSongName = (fileName: string) => {
        // Remove dashes and capitalize the start of each word
        return fileName.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // Function to handle processing change for a track
    const handleProcessingChange = (id: number, uploadSequence: UploadSequence) => {
        // Update processing status for the track with given ID
        setTracks((prevTracks) => prevTracks.map((track) => (track.id === id ? { ...track, uploadSequence } : track)));
    };

    // Callback function for when files are dropped
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            // Process each dropped file
            acceptedFiles.forEach((file) => {
                const parts = file.name.split("-");
                const songName = parts[0];
                const defaultSongName = preprocessSongName(songName);
                // Add track details to the state
                setTracks((prevTracks) => [
                    ...prevTracks,
                    {
                        id: nextTrackId,
                        songName,
                        uploadSequence: UploadSequence.PROCESSING,
                        defaultSongName,
                    },
                ]);
                // Increment the track ID for next track
                setNextTrackId((prevId) => prevId + 1);
            });
        },
        [nextTrackId]
    );

    // Hook for drop zone functionality
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    // JSX for rendering Upload component
    return (
        <div className="relative flex justify-evenly flex-col">
            {/* Render drop zone if no tracks are processing */}
            {!tracks.some((item) => item.uploadSequence !== UploadSequence.NONE) && (
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
            {/* Render track details for each track */}
            {tracks.map((track, index) =>
                track.uploadSequence === UploadSequence.PROCESSING ? (
                    <UploadDetails
                        key={index}
                        defaultSongName={track.defaultSongName}
                        uploadSequence={track.uploadSequence}
                        setUploadSequence={(uploadSequence) => handleProcessingChange(track.id, uploadSequence)}
                        // songCount={tracks.length}
                        // trackIndex={index}
                    />
                ) : null
            )}
        </div>
    );
};

export default Upload; // Export the Upload component
