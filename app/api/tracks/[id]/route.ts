import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { SongType } from "@/lib/types";

const prisma = new PrismaClient();

// Get a single song by ID
export async function GET(request: NextApiRequest, response: NextApiResponse) {
    try {
        const songId = request.query.id as string;

        // Retrieve the song from the database
        const song = await prisma.song.findUnique({
            where: {
                id: songId,
            },
        });

        if (!song) {
            return response.status(404).json({ error: "Song not found" });
        }

        return response.json(song);
    } catch (error) {
        console.error("Error fetching song:", error);
        return response.status(500).json({ error: "Failed to fetch song" });
    }
}

// Create a new song
export default async function POST(request: NextApiRequest, response: NextApiResponse) {
    try {
        const { title, album_name, artist, price, genre, release_date, bpm, img, audio_file }: SongType = request.body;

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

        return response.json(createdSong);
    } catch (error) {
        console.error("Error creating song:", error);
        return response.status(500).json({ error: "Failed to create song" });
    }
}

// Delete an existing song by ID
export async function DELETE(request: NextApiRequest, response: NextApiResponse) {
    try {
        const songId = request.query.id as string;

        // Delete the song from the database
        await prisma.song.delete({
            where: {
                id: songId,
            },
        });

        return response.status(204).end(); // No content response
    } catch (error) {
        console.error("Error deleting song:", error);
        return response.status(500).json({ error: "Failed to delete song" });
    }
}
