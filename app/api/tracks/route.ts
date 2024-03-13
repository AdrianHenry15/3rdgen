import { PrismaSongType, S3FileRef } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { uploadFileToS3 } from "s3-operations/createS3Operations";
import path from "path";

const prisma = new PrismaClient();

// GET ALL SONGS
export async function GET(request: Request) {
    try {
        const songs = await prisma.song.findMany({
            include: {
                audioFile: true, // Include the associated S3TrackDataRef information
            },
        });
        return Response.json(songs);
    } catch (error) {
        console.error("Error fetching songs:", error);
        return new Response("Failed to fetch songs", { status: 500 });
    }
}

// CREATE A TRACK
export default async function POST(request: NextApiRequest, response: NextApiResponse) {
    try {
        const { title, bpm, artist, genre, price, plays, releaseDate, audioFile, img }: PrismaSongType = request.body;

        // Upload audio file to S3
        const audioFilePath = audioFile.key;
        const audioBucketName = audioFile.bucket;
        const audioFolderName = "audio";
        await uploadFileToS3(audioFilePath, audioBucketName, audioFolderName);

        // Upload image file to S3
        const imgFilePath = img.key;
        const imgBucketName = img.bucket;
        const imgFolderName = "images";
        await uploadFileToS3(imgFilePath, imgBucketName, imgFolderName);

        // Create the track in the database
        const createdTrack = await prisma.song.create({
            data: {
                title,
                artist,
                genre,
                price,
                bpm,
                plays,
                releaseDate,
                audioFile: {
                    create: {
                        bucket: audioBucketName,
                        key: `${audioFolderName}/${path.basename(audioFilePath)}`,
                        metadata: {
                            create: {
                                duration: audioFile.metadata!.duration,
                            },
                        },
                    },
                },
                img: {
                    create: {
                        bucket: imgBucketName,
                        key: `${imgFolderName}/${path.basename(imgFilePath)}`,
                    },
                },
            },
            include: {
                audioFile: true,
            },
        });

        return response.json(createdTrack);
    } catch (error) {
        console.error("Error creating track:", error);
        return response.status(500).json({ error: "Failed to create track" });
    }
}
