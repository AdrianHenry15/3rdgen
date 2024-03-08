"use client";

import { Box, Slider, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useAudioPlayerStore } from "stores/audio-player-store";

const Duration = () => {
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const [isSeeking, setIsSeeking] = useState(false);

    const { audioRef } = useAudioPlayerStore(); // Get audioRef from store

    useEffect(() => {
        if (audioRef.current) {
            // Update duration when metadata is loaded
            audioRef.current.addEventListener("loadedmetadata", () => {
                const totalSeconds = audioRef.current!.duration;
                const totalMinutes = Math.floor(totalSeconds / 60);
                const remainingSeconds = Math.floor(totalSeconds % 60);
                setDuration(`${totalMinutes}:${remainingSeconds.toString().padStart(2, "0")}`);
            });
            // Update current time on timeupdate event
            audioRef.current.addEventListener("timeupdate", () => {
                if (!isSeeking) {
                    const currentSeconds = audioRef.current!.currentTime;
                    const currentMinutes = Math.floor(currentSeconds / 60);
                    const remainingSeconds = Math.floor(currentSeconds % 60);
                    setCurrentTime(`${currentMinutes}:${remainingSeconds.toString().padStart(2, "0")}`);
                }
            });
        }
    }, [audioRef, isSeeking]);
    const handleSeek = (event: any, newValue: number | number[]) => {
        const newTime = ((newValue as number) / 100) * audioRef.current!.duration;
        setCurrentTime(formatTime(newTime));

        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const formatTime = (timeInSeconds: number) => {
        const totalMinutes = Math.floor(timeInSeconds / 60);
        const remainingSeconds = Math.floor(timeInSeconds % 60);
        return `${totalMinutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };
    return (
        <Box sx={{ width: 300 }}>
            <Stack spacing={2} direction="row" alignItems="center">
                <span>{currentTime}</span>
                <Slider
                    size="small"
                    aria-label="small"
                    defaultValue={70}
                    value={audioRef.current ? (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0 : 0}
                    max={100}
                    onChange={handleSeek}
                    onMouseDown={() => setIsSeeking(true)}
                    onMouseUp={() => setIsSeeking(false)}
                    sx={{ color: "error.main" }}
                />
                <span>{duration}</span>
            </Stack>
        </Box>
    );
};

export default Duration;
