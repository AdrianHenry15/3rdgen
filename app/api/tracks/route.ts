import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SongType } from "@/lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        // Retrieve all songs from the database
        const songs = await prisma.song.findMany();

        return NextResponse.json(songs);
    } catch (error) {
        console.error("Error fetching songs:", error);
        return NextResponse.json({ error: "Failed to fetch songs" });
    }
}

export async function POST(req: NextApiRequest, res: NextResponse) {
    try {
        const body: SongType = req.body;

        // Create the song in the database
        const createdSong = await prisma.song.create({
            data: {
                title: body.title,
                img: body.img,
                price: body.price ?? 0, // Default value if not provided
                artist: body.artist,
                audio_file: body.audio_file,
                album_name: body.album_name,
                genre: body.genre,
                release_date: body.release_date,
                backdrop_path: body.backdrop_path,
                plays: body.plays ?? 0, // Default value if not provided
                bpm: body.bpm,
                song_key: body.song_key,
            },
        });

        return NextResponse.json(createdSong);
    } catch (error) {
        console.error("Error creating song:", error);
        return NextResponse.json({ error: "Failed to create song" });
    }
}
