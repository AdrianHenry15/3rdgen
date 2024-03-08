"use client";

import React from "react";

import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

import { useAudioPlayerStore } from "stores/audio-player-store";

const MobileControls = () => {
    const { playNext, playPrevious } = useAudioPlayerStore();

    const SkipButton = "mx-4 text-gray-400 hover:text-white cursor-pointer transition-colors duration-300 ease-in-out";

    return (
        <div className="flex justify-center">
            {/* PREVIOUS */}
            <MdSkipPrevious onClick={() => playPrevious()} className={SkipButton} size={30} />
            {/* NEXT */}
            <MdSkipNext onClick={() => playNext()} className={SkipButton} size={30} />
        </div>
    );
};

export default MobileControls;
