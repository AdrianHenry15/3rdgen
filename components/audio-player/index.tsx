"use client";

import React from "react";

import RightPanel from "./right-panel";
import TrackDisplay from "./track-display";
import Controls from "./controls";
import { useTrackStore } from "stores/track-store";

const AudioPlayer = () => {
    const { currentTrack } = useTrackStore();
    return currentTrack.id === "" ? null : (
        <div className="bg-black z-50 px-4 text-white fixed justify-between bottom-0 w-full h-[85px] flex items-center">
            {/* ARTWORK, ARTIST, SONG, LIKE BUTTON */}
            <TrackDisplay />
            {/* AUDIO ACTIONS AND DURATION */}
            <Controls />
            {/* VOLUME */}
            <RightPanel />
        </div>
    );
};

export default AudioPlayer;
