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

// Update an existing song by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { title, album_name, artist, price, genre, release_date, bpm, img, audio_file }: SongType = await request.json();

        // Check if the song exists
        const existingSong = await prisma.song.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!existingSong) {
            return NextResponse.json({ error: "Song not found" }, { status: 404 });
        }

        // Update the song in the database
        const updatedSong = await prisma.song.update({
            where: {
                id: params.id,
            },
            data: {
                title: title ?? existingSong.title,
                album_name: album_name ?? existingSong.album_name,
                artist: artist ?? existingSong.artist,
                price: price ?? existingSong.price,
                genre: genre ?? existingSong.genre,
                release_date: release_date ?? existingSong.release_date,
                bpm: bpm ?? existingSong.bpm,
                img: img ?? existingSong.img,
                audio_file: audio_file ?? existingSong.audio_file,
            },
        });

        return NextResponse.json(updatedSong);
    } catch (error) {
        console.error("Error updating song:", error);
        return NextResponse.json({ error: "Failed to update song" }, { status: 500 });
    }
}
