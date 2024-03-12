"use client";

import MusicSplash from "@/components/layout/music/music-splash";
import TrackRow from "@/components/layout/music/tracks/track-row";

import { HipHopBeats, HyperpopBeats, ChillHipHopBeats, AfroBeats, FreeBeats, HouseBeats } from "@/lib/tracks";
import { useEffect, useState } from "react";

export default function MusicPage() {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        async function fetchTracks() {
            try {
                const response = await fetch("/api/tracks");
                if (!response.ok) {
                    throw new Error("Failed to fetch tracks");
                }
                const data = await response.json();
                setTracks(data.tracks);
            } catch (error) {
                console.error("Error fetching tracks:", error);
            }
        }
        fetchTracks();
    }, []);
    return (
        <div className="flex flex-col h-full bg-black">
            <MusicSplash />
            <div className="py-10">
                <TrackRow title="Test" items={tracks} />
                <TrackRow title="Hip-Hop Tracks By Search" items={HipHopBeats} />
                <TrackRow title="Hyperpop Tracks By Search" items={HyperpopBeats} />
                <TrackRow title="Chill Hip-Hop Tracks By Search" items={ChillHipHopBeats} />
                <TrackRow title="AfroBeat Tracks By Search" items={AfroBeats} />
                <TrackRow title="Free Tracks By Search" items={FreeBeats} />
                <TrackRow title="House Tracks By Search" items={HouseBeats} />
            </div>
        </div>
    );
}
