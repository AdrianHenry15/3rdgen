import { PrismaSongType, SongType } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSingleFileFromBucket } from "s3-operations/getS3Operations";

const prisma = new PrismaClient();

// GET SONG BY ID
export async function GET(request: Request, id: string) {
    try {
        const song = await prisma.song.findUnique({
            where: { id: id },
            include: {
                audioFile: {
                    include: { metadata: true }, // Include S3 metadata
                },
                Artist: true,
            },
        });

        if (song) {
            // Access S3 file data
            const s3FileData = song.audioFile;

            // Fetch content from S3
            const s3FileContent = await getSingleFileFromBucket(s3FileData.bucket, s3FileData.key);

            if (s3FileContent) {
                // Merge S3 file content with song data
                const songWithS3Data = {
                    ...song,
                    file: {
                        ...s3FileData,
                        content: s3FileContent.content, // Add S3 file content to song file data
                    },
                };

                return new Response(JSON.stringify(songWithS3Data), { status: 200, headers: { "Content-Type": "application/json" } });
            } else {
                return new Response("Failed to fetch S3 file content", { status: 500 });
            }
        } else {
            return new Response("Song not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching song:", error);
        return new Response("Failed to fetch song", { status: 500 });
    }
}

// UPDATE TRUCK
export async function PUT(request: NextApiRequest, response: NextApiResponse) {
    const { id } = request.query as { id: string }; // Extract track ID from request params

    try {
        // Extract updated track data from request body
        const { title, genre, releaseDate, audioFile, img }: PrismaSongType = request.body;

        // Update the track in the database
        const updatedTrack = await prisma.song.update({
            where: { id }, // Specify the track ID to update
            data: {
                title,
                genre,
                releaseDate,
                audioFile: {
                    update: {
                        bucket: audioFile.bucket,
                        key: audioFile.key,
                        metadata: {
                            update: {
                                duration: audioFile.metadata!.duration,
                            },
                        },
                    },
                },
                img: {
                    update: {
                        bucket: img.bucket,
                        key: img.key,
                    },
                },
            },
            include: {
                audioFile: true,
            },
        });

        // Return the updated track as JSON response
        return Response.json(updatedTrack);
    } catch (error) {
        console.error("Error updating track:", error);
        return Response.json({ error: "Failed to update track" });
    }
}
