import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET ALL SONGS
export async function GET(request: Request) {
    try {
        const songs = await prisma.song.findMany();
        return Response.json(songs);
    } catch (error) {
        console.error("Error fetching songs:", error);
        return new Response("Failed to fetch songs", { status: 500 });
    }
}
