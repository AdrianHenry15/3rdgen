import { NextRequest, NextResponse } from "next/server";
import prisma from "db";

export async function GET() {
    // Fetch songs from the Prisma MongoDB database
    const AllSongs = await prisma.song.findMany({
        select: {
            id: true,
            img: true,
            title: true,
            albumName: true,
            song: true,
            genre: true,
            releaseDate: true,
            duration: true,
            plays: true,
            likes: true,
            Artist: true,
        },
    });

    // Respond with the fetched songs
    return NextResponse.json({ message: "Songs successfully fetched!", data: AllSongs });
}

export async function POST(req: Request) {
    const { id, img, title, genre, albumName, artist, duration, plays, song, likes, releaseDate } = await req.json();

    // create song
    const CreatedSong = await prisma.song.create({
        data: {
            id: id,
            img: img,
            title: title,
            albumName: albumName,
            artist: artist,
            genre: genre,
            releaseDate: releaseDate,
            duration: duration,
            plays: plays,
            song: song,
            likes: likes,
            Artist: artist,
        },
    });

    // Respond with the created songs
    return NextResponse.json({ message: "Songs successfully created!", data: CreatedSong });
}

export async function PUT(req: Request) {
    const { id, img, title, genre, albumName, artist, duration, plays, song, likes, releaseDate } = await req.json();

    // update song
    const UpdatedSong = await prisma.song.update({
        where: {
            id: id,
        },
        data: {
            img: img,
            title: title,
            albumName: albumName,
            artist: artist,
            genre: genre,
            releaseDate: releaseDate,
            duration: duration,
            plays: plays,
            song: song,
            likes: likes,
            Artist: artist,
        },
    });

    // Respond with the updated songs
    return NextResponse.json({ message: "Songs successfully updated!", data: UpdatedSong });
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();

    // deleted song
    const DeletedSong = await prisma.song.delete({
        where: {
            id: id,
        },
    });

    // Respond with the deleted songs
    return NextResponse.json({ message: "Songs successfully deleted!", data: DeletedSong });
}