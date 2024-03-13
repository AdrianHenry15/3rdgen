import { S3FileRef, PrismaSongType } from "./types";
import { SearchArtistProfile } from "./artists";

// Define S3 image references
const AfroBeatImg: S3FileRef = { bucket: "tgs-music-pics", key: "afrobeat.jpg" };

// Define S3 audio references
const LosBienesAudio: S3FileRef = { bucket: "tgs-song-files", key: "los-bienes.mp3", metadata: "metadata_id" };

export const AfroBeats: PrismaSongType[] = [
    {
        id: "los-bienes",
        img: AfroBeatImg,
        title: "Los Bienes",
        overview: "",
        artist: SearchArtistProfile,
        release_date: "2024",
        audio_file: LosBienesAudio,
        backdrop_path: AfroBeatImg,
        bpm: "101",
        price: 99.0,
        song_key: "Eb-Minor",
        isFree: true,
        album_name: "",
    },
];

// Define other arrays similarly
