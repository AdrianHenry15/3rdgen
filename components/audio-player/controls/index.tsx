import React from "react";

import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

import AudioPlayerPlayButton from "./play-button";
import { useAudioPlayerStore } from "stores/audio-player-store";
import Duration from "./duration";

const Controls = () => {
    const { playNext, playPrevious } = useAudioPlayerStore();

    const SkipButton = "mx-4 text-gray-400 hover:text-white cursor-pointer transition-colors duration-300 ease-in-out";
    const AltButton = "text-gray-400 hover:text-white cursor-pointer transition-colors duration-300 ease-in-out";

    return (
        <div className="flex-col flex-1 hidden md:flex">
            {/* PLAYER ACTIONS */}
            <div className="flex justify-center items-center">
                {/* SHUFFLE */}
                {/* <BiShuffle className={AltButton} size={20} /> */}
                {/* PREVIOUS */}
                <MdSkipPrevious onClick={() => playPrevious()} className={SkipButton} size={30} />
                {/* PLAY/PAUSE */}
                <AudioPlayerPlayButton />
                {/* NEXT */}
                <MdSkipNext onClick={() => playNext()} className={SkipButton} size={30} />
                {/* REPEAT */}
                {/* <LuRepeat2 className={AltButton} size={20} /> */}
            </div>
            {/* DURATION */}
            <div className="h-min hidden self-center md:flex">
                <Duration />
            </div>
        </div>
    );
};

export default Controls;
