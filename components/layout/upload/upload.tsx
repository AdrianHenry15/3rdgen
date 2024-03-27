"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadDetails from "./upload-details";
import { UploadSequence, SongType } from "../../../lib/types";

const Upload: React.FC = () => {
    const [tracks, setTracks] = useState<SongType[]>([]);

    const preprocessSongName = (fileName: string) => {
        return fileName.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // Function to update a specific song in the tracks array
    const updateTrack = (updatedTrack: Partial<SongType>, trackIndex: number) => {
        setTracks((prevTracks) => {
            const newTracks = [...prevTracks]; // Create a copy of the tracks array
            // Update the specified track with the updated properties
            newTracks[trackIndex] = { ...newTracks[trackIndex], ...updatedTrack };
            return newTracks; // Return the updated array
        });
    };

    // Function to update a specific property of a track in the tracks array
    const updateTrackProperty = (property: string, value: string | number, trackIndex: number) => {
        // Update the state of tracks array using the functional form of setState
        setTracks((prevTracks) => {
            // Create a new array by spreading the previous tracks array
            const newTracks = [...prevTracks];
            // Update the specific track at trackIndex by spreading its previous properties and updating the specified property with the new value
            newTracks[trackIndex] = {
                ...newTracks[trackIndex],
                [property]: value,
            };
            // Return the updated tracks array
            return newTracks;
        });
    };

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            acceptedFiles.forEach((file) => {
                const parts = file.name.split("-");
                const songName = parts[0];
                const defaultSongName = preprocessSongName(songName);
                // Add track to the store
                setTracks((prevTracks) => [
                    ...prevTracks,
                    {
                        id: file.name,
                        title: defaultSongName,
                        upload_sequence: UploadSequence.PROCESSING,
                        audio_file: file.name,
                        img: {},
                        price: 0,
                        artist: "",
                    },
                ]);
            });
        },
        [setTracks]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="relative flex justify-evenly flex-col">
            {/* Render drop zone if no tracks are processing */}
            {!tracks.some((item) => item.upload_sequence !== UploadSequence.NONE) && (
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
            <div className="h-screen">
                {tracks.map(
                    (track, index) =>
                        track.upload_sequence !== UploadSequence.NONE && (
                            <UploadDetails
                                setTrack={(updatedTrack: Partial<SongType>) => updateTrack(updatedTrack, index)}
                                updateTrackProperty={updateTrackProperty}
                                index={index}
                                key={track.id}
                                track={track}
                            />
                        )
                )}
            </div>
        </div>
    );
};

export default Upload;
