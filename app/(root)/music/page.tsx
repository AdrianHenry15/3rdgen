"use client";

import MusicSplash from "@/components/layout/music/music-splash";
import TrackRow from "@/components/layout/music/tracks/track-row";

import { HipHopBeats, HyperpopBeats, ChillHipHopBeats, AfroBeats, FreeBeats, HouseBeats } from "@/lib/tracks";

export default function MusicPage() {
    return (
        <div className="flex flex-col h-full bg-black">
            <MusicSplash />
            <div className="p-10">
                <TrackRow title="Free Tracks By Search" items={FreeBeats} />
                <TrackRow title="Hip-Hop Tracks By Search" items={HipHopBeats} />
                <TrackRow title="Hyperpop Tracks By Search" items={HyperpopBeats} />
                <TrackRow title="Chill Hip-Hop Tracks By Search" items={ChillHipHopBeats} />
                <TrackRow title="AfroBeat Tracks By Search" items={AfroBeats} />
                <TrackRow title="House Tracks By Search" items={HouseBeats} />
            </div>
        </div>
    );
}
