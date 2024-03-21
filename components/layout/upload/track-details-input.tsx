import React from "react";

interface ITrackDetailsInputProps {
    songName: string;
    placeHolder: string;
    label: string;
    htmlFor: string;
    setSongName: (value: string) => void;
}

const TrackDetailsInput = (props: ITrackDetailsInputProps) => {
    const handleSongNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setSongName(e.target.value); // Call setSongName with the new value from input
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
                value={props.songName}
                onChange={handleSongNameChange}
            />
        </div>
    );
};

export default TrackDetailsInput;
