import { SongType } from "@/lib/types";
import React from "react";

interface ITrackDetailsInputProps {
    track: SongType;
    value: string;
    trackIndex: number;
    placeHolder: string;
    label: string;
    htmlFor: string;
    setTrack: (updatedTrack: Partial<SongType>, trackIndex: number) => void;
}

const TrackDetailsInput = (props: ITrackDetailsInputProps) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.value === props.track.title) {
            props.setTrack({ title: e.target.value }, props.trackIndex);
        } else if (props.value === props.track.bpm) {
            props.setTrack({ bpm: e.target.value }, props.trackIndex);
        } else if (props.value === props.track.song_key) {
            props.setTrack({ song_key: e.target.value }, props.trackIndex);
        }

        console.log(props.value);
    };

    return (
        <div className="flex flex-col items-start mb-4 w-full">
            <label className="text-[12px] text-white mb-2" htmlFor={props.htmlFor}>
                {props.label}
            </label>
            <input
                className="h-7 rounded-sm w-full"
                type="text"
                placeholder={props.placeHolder}
                value={props.value}
                onChange={handleInput}
            />
        </div>
    );
};

export default TrackDetailsInput;
