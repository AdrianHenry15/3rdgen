import { PrismaClient } from "@prisma/client";
import { SongType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        // Retrieve all songs from the database
        const songs = await prisma.song.findMany();

        return NextResponse.json(songs);
    } catch (error) {
        console.error("Error fetching songs:", error);
        return NextResponse.json({ error: "Failed to fetch songs" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const {
            title,
            img,
            price,
            artist,
            audio_file,
            album_name,
            genre,
            release_date,
            backdrop_path,
            plays,
            bpm,
            song_key,
            created_at,
        }: SongType = await request.json();

        // Create the song in the database
        const createdSong = await prisma.song.create({
            data: {
                title,
                img,
                price, // Default value if not provided
                artist,
                audio_file,
                album_name,
                genre,
                release_date,
                backdrop_path,
                plays, // Default value if not provided
                bpm,
                song_key,
                created_at,
            },
        });

        return NextResponse.json(createdSong);
    } catch (error) {
        console.error("Error creating song:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
