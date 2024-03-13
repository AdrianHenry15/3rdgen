import { NavMenuType } from "./types";

export enum NavMenuItems {
    HOME = "Home",
    WEBSITES = "Websites",
    MUSIC = "Music",
    UPLOAD = "Upload",
    CONTACT_US = "Contact Us",
    ESTIMATE = "Get Your Free Estimate",
}

export const NavMenuTypeItems: NavMenuType[] = [
    {
        title: NavMenuItems.HOME,
        link: "/",
    },
    {
        title: NavMenuItems.WEBSITES,
        link: "/websites",
    },
    {
        title: NavMenuItems.MUSIC,
        link: "/music",
    },
    // {
    //     title: "Pricing",
    //     link: "/pricing",
    // },
];
export const NavMenuTypeAltItems: NavMenuType[] = [
    {
        title: NavMenuItems.CONTACT_US,
        link: "/contact-us",
    },
    {
        title: NavMenuItems.ESTIMATE,
        link: "/estimate",
    },
];
