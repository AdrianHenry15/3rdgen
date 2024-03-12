import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface TrackData {
    title: string;
    artist: string;
    genre: string;
    releaseDate: string;
    file: {
        bucket: string;
        key: string;
        metadata: {
            duration: number;
        };
    };
}

// GET ALL SONGS
export async function GET(request: Request) {
    try {
        const songs = await prisma.song.findMany({
            include: {
                file: true, // Include the associated S3TrackDataRef information
                Artist: true, // Include the associated Artist information
            },
        });
        return Response.json(songs);
    } catch (error) {
        console.error("Error fetching songs:", error);
        return new Response("Failed to fetch songs", { status: 500 });
    }
}

// CREATE A TRACK
export async function POST(request: NextApiRequest, response: NextApiResponse) {
    try {
        // Extract track data from request body
        const { title, artist, genre, releaseDate, file }: TrackData = request.body;

        // Create the track in the database
        const createdTrack = await prisma.song.create({
            data: {
                title,
                artist,
                genre,
                releaseDate,
                file: {
                    create: {
                        bucket: file.bucket,
                        key: file.key,
                        metadata: {
                            create: {
                                duration: file.metadata.duration,
                            },
                        },
                    },
                },
            },
            include: {
                file: true,
            },
        });

        // Return the created track as JSON response
        return Response.json(createdTrack);
    } catch (error) {
        console.error("Error creating track:", error);
        return new Response("Failed to create track", { status: 500 });
    }
}
