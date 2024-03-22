import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { createFolderInS3 } from "s3-operations/createS3Operations";

const Bucket = process.env.AWS_IMAGE_BUCKET as string;
const s3 = new S3Client({
    region: process.env.AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

async function listFolders(): Promise<string[]> {
    try {
        const params = {
            Bucket: Bucket,
            Delimiter: "/",
        };

        const data = await s3.send(new ListObjectsV2Command(params));
        if (data.CommonPrefixes) {
            return data.CommonPrefixes.map((prefix) => prefix.Prefix!.replace("/", ""));
        }
        return [];
    } catch (error) {
        console.error("Error listing folders:", error);
        throw new Error("Failed to list folders.");
    }
}

export async function GET(request: NextRequest) {
    try {
        const folders = await listFolders();
        if (folders.length > 0) {
            return NextResponse.json({ message: `Found ${folders.length} folder(s) in bucket`, folders });
        } else {
            return NextResponse.json({ message: "No folders found in bucket" });
        }
    } catch (error) {
        console.error("Error getting folders:", error);
        return NextResponse.json({ error: "Failed to get folders" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const { folderName } = await request.json();

    if (!folderName) {
        return NextResponse.json({ error: "Folder name is required" }, { status: 400 });
    }

    try {
        await createFolderInS3(Bucket, folderName);
        return NextResponse.json({ message: `Folder '${folderName}' created successfully` });
    } catch (error) {
        console.error("Error creating folder:", error);
        return NextResponse.json({ error: "Failed to create folder" }, { status: 500 });
    }
}
