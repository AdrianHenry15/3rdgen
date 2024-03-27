import { create } from "zustand";
import { SongType, UploadSequence } from "@/lib/types";

interface ITrackState {
    currentTrack: SongType;
}

interface ITrackActions {
    setCurrentTrack: (currentTrack: SongType) => void;
}

type TrackStore = ITrackState & ITrackActions;

export const useTrackStore = create<TrackStore>()((set) => ({
    currentTrack: {
        id: "",
        img: {},
        title: "",
        artist: "",
        upload_sequence: UploadSequence.NONE,
        release_date: "",
        audio_file: "",
        backdrop_path: {},
        bpm: "",
        price: 0,
        key: "",
        isFree: false,
    },
    setCurrentTrack: (currentTrack: SongType) => set(() => ({ currentTrack: currentTrack })),
}));
