export type NavMenuType = {
    title: string;
    link: string;
};

export type WebsiteType = {
    id: string;
    img: any;
    title: string;
    overview: string;
    release_date: string;
    link: string; // Add link property
    backdrop_path: any;
};

export interface S3File {
    bucket: string;
    key: string;
    content: string;
}

export type SongType = {
    id: string;
    img: any;
    title: string;
    overview: string;
    artist: ArtistType; // Rename artist_name from artist
    release_date: string;
    audio_file: string; // Change any to string for audio_file
    backdrop_path: any;
    bpm: string;
    price: number;
    key: string;
    isFree: boolean;
};

export type ArtistType = {
    id: string;
    img: any;
    title: string;
    overview: string;
    release_date: string;
    songs: SongType[]; // Change songs type from an empty array to SongType[]
    backdrop_path: any;
};

export type LicenseDataType = {
    title: string;
    price: number;
    fileType?: string;
    description?: string;
    value: LicenseType;
};

export enum LicenseType {
    BASIC = "Basic",
    STANDARD = "Standard",
    PREMIUM = "Premium",
}
