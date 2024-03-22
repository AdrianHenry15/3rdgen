import { DeleteObjectCommand, S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { deleteFolderFromS3 } from "s3-operations/deleteS3Operations";

const Bucket = process.env.AWS_IMAGE_BUCKET as string;
const s3 = new S3Client({
    region: process.env.AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

export async function GET(request: NextRequest, { params }: { params: { key: string } }) {
    const { key } = params;

    try {
        // Specify parameters for listing objects in the folder
        const params = {
            Bucket: Bucket,
            Prefix: key + "/", // Add trailing slash to indicate folder
        };

        // List objects in the folder using listObjectsV2 method
        const data = await s3.send(new ListObjectsV2Command(params));

        // Check if any objects are returned
        if (data.Contents && data.Contents.length > 0) {
            // Return the keys of all objects in the folder
            const contents = data.Contents.map((content) => content.Key);
            return NextResponse.json({ message: `Found ${contents.length} items in '${key}'`, contents });
        } else {
            return NextResponse.json({ message: `No items found in '${key}'` });
        }
    } catch (error) {
        console.error("Error getting folder contents:", error);
        return NextResponse.json({ error: "Failed to get folder contents" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params, body }: { params: { key: string }; body: any }) {
    const { key } = params;
    const { newKey } = body;

    try {
        // Rename the folder by deleting the existing one and creating a new one
        await deleteFolderFromS3(Bucket, key);
        await deleteFolderFromS3(Bucket, newKey);

        return NextResponse.json({ message: `Folder '${key}' renamed to '${newKey}' successfully` });
    } catch (error) {
        console.error("Error renaming folder:", error);
        return NextResponse.json({ error: "Failed to rename folder" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { key: string } }) {
    const { key } = params;

    try {
        // Delete the object from S3 based on the provided ID
        const command = new DeleteObjectCommand({ Bucket, Key: key });
        await s3.send(command);

        return NextResponse.json({ message: `Object with ID '${key}' deleted successfully` });
    } catch (error) {
        console.error("Error deleting object:", error);
        return NextResponse.json({ error: "Failed to delete object" }, { status: 500 });
    }
}
