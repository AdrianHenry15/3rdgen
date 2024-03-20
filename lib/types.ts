export enum Roles {
    ADMIN = "admin",
}

export type NavMenuType = {
    title: string;
    link: string;
    role?: Roles;
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

export type SongType = {
    id: string;
    img: any;
    title: string;
    price: number;
    artist: string;
    audio_file: string;
    album_name?: string;
    genre?: string;
    release_date?: string;
    backdrop_path?: any;
    plays?: number;
    bpm?: string;
    song_key?: string;
    created_at?: Date;
};

export type ArtistType = {
    id: string;
    img: any;
    title: string;
    songs: SongType[]; // Change songs type from an empty array to SongType[]
    overview?: string;
    release_date?: string;
    backdrop_path?: any;
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
