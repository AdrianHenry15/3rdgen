"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";

import { truncateString } from "@/lib/helpers";

import { AllSearchTracks } from "@/lib/tracks";
import Logo from "@/public/logos/thirdgenstudios-logo.png";

import { useAudioPlayerStore } from "stores/audio-player-store";
import { useTrackStore } from "stores/track-store";
import { SongType } from "@/lib/types";

import "swiper/css";
import { useCartStore } from "stores/cart-store";

const MusicSplash = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { isPlaying, play, pause } = useAudioPlayerStore();
    const { currentTrack, setCurrentTrack } = useTrackStore();
    const { items, addItem } = useCartStore();

    const handleClick = (currentTrack: SongType) => {
        if (isPlaying && currentTrack.id === currentTrack.id) {
            pause();
        } else {
            play(currentTrack);
            setCurrentTrack(currentTrack);
        }
    };

    useEffect(() => {
        const options = {
            threshold: 0.1, // Adjust the threshold as needed (percentage of element visibility)
        };

        const callback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    containerRef.current?.classList.add("show");
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect(); // Cleanup observer on component unmount
    }, []);

    return (
        <div ref={containerRef} className="fade-in w-[100%] h-[300px] self-center text-white md:h-[750px]">
            <div className="w-full md:h-full">
                <Swiper
                    modules={[A11y, Autoplay]}
                    className="h-full"
                    navigation
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{ delay: 5000 }}
                >
                    {AllSearchTracks.map((track) => (
                        <SwiperSlide key={track.id}>
                            <div className="absolute w-1/2 h-[750px] bg-gradient-to-r from-black hidden md:flex"></div>
                            <div className="w-full h-full flex justify-center items-center">
                                <Image
                                    width={1000}
                                    height={1000}
                                    className="w-full object-cover h-[200px] md:h-[50%] md:w-[66%] lg:h-[60%] lg:w-[50%]"
                                    src={track?.backdrop_path}
                                    alt={track?.title}
                                />
                            </div>
                            {/* TRACK INFO */}
                            <div className="w-full top-[37%] left-10 p-4 md:p-8 md:absolute">
                                <span>
                                    <Image src={Logo} alt="logo" className="w-24 py-2" />
                                </span>
                                <h1 className="text-white text-3x1 md:text-5xl">{track?.title}</h1>
                                <div className="my-4">
                                    {/* <button className="border  text-white border-gray-300 py-2 px-5 ml-4">Play Previous Track</button> */}
                                    {/* PLAY BUTTON */}
                                    <button
                                        onClick={() => handleClick(track)}
                                        className="border bg-gray-300 text-black border-gray-300 py-2 px-5"
                                    >
                                        {isPlaying && track.id === currentTrack.id ? "Pause" : "Play"}
                                    </button>
                                    {/* ADD TO CART BUTTON */}
                                    <button
                                        onClick={() => addItem(track)}
                                        className={`${items.find((item) =>
                                            item.id === track.id ? "bg-red-500 cursor-not-allowed" : "bg-blue-600 cursor-pointer"
                                        )} border-white border-[1px] text-black py-2 px-5 mx-1`}
                                    >
                                        Add To Cart
                                    </button>
                                    {/* <button className="border  text-white border-gray-300 py-2 px-5 ml-4">Play Next Track</button> */}
                                </div>
                                <p className="text-gray-400 text-sm">Released: {track?.release_date}</p>
                                <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
                                    {truncateString(track.overview!, 150)}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default MusicSplash;
