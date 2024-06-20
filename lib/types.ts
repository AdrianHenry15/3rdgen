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
