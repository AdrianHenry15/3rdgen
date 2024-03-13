import { S3FileRef } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express"; // Assuming you are using Express
import { getAllFilesFromFolder } from "s3-operations/getS3Operations";

const prisma = new PrismaClient();

// GET SONGS IN A PARTICULAR FOLDER
export async function GET(request: Request, response: Response, bucketName: string, folder: string) {
    try {
        // Get all files from the specified folder in the S3 bucket
        const s3Files: S3FileRef[] = await getAllFilesFromFolder(bucketName, folder);

        if (s3Files.length === 0) {
            return response.status(404).json({ message: `No files found in folder '${folder}'` });
        }

        // For each S3 file, find the corresponding song in the database
        const songs = await Promise.all(
            s3Files.map(async (s3File) => {
                const song = await prisma.song.findUnique({
                    where: { id: s3File.key }, // Assuming the song ID is the same as the S3 file key
                    include: {
                        audioFile: {
                            include: { metadata: true },
                        },
                        Artist: true,
                    },
                });
                return song;
            })
        );

        // Filter out any null values (songs not found in the database)
        const existingSongs = songs.filter((song) => song !== null);

        if (existingSongs.length > 0) {
            return response.status(200).json(existingSongs);
        } else {
            return response.status(404).json({ message: `No songs found in folder '${folder}'` });
        }
    } catch (error) {
        console.error("Error fetching songs:", error);
        return response.status(500).json({ message: "Failed to fetch songs" });
    }
}
