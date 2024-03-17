import { PrismaClient } from "@prisma/client";
import { SongType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get a single song by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Retrieve the song from the database
        const song = await prisma.song.findUnique({
            where: {
                id: params.id as string,
            },
        });

        if (!song) {
            return NextResponse.json({ error: "Song not found" }, { status: 405 });
        }

        return NextResponse.json(song);
    } catch (error) {
        console.error("Error fetching song:", error);
        return NextResponse.json({ error: "Failed to fetch song" }, { status: 400 });
    }
}

// Create a new song
export default async function POST(request: NextRequest) {
    try {
        const { title, album_name, artist, price, genre, release_date, bpm, img, audio_file }: SongType = await request.json();

        // Create the song in the database
        const createdSong = await prisma.song.create({
            data: {
                title,
                album_name,
                artist,
                price,
                genre,
                release_date,
                bpm,
                img,
                audio_file,
            },
        });

        return NextResponse.json(createdSong);
    } catch (error) {
        console.error("Error creating song:", error);
        return NextResponse.json({ error: "Failed to create song" }, { status: 500 });
    }
}

// Delete an existing song by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Delete the song from the database
        await prisma.song.delete({
            where: {
                id: params.id,
            },
        });

        return NextResponse.json("Track deleted successfully"); // No content response
    } catch (error) {
        console.error("Error deleting song:", error);
        return NextResponse.json({ error: "Failed to delete song" }), { status: 500 };
    }
}
