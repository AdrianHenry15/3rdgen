import { NextRequest, NextResponse } from "next/server";
import {
    CopyObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
    HeadObjectCommand,
    NoSuchKey,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Bucket, s3 } from "@/config/aws.config";

async function uploadObject(key: string, data: any): Promise<void> {
    const uploadParams = {
        Bucket: Bucket,
        Key: key,
        Body: JSON.stringify(data),
    };

    try {
        // Upload or update the object
        await s3.send(new PutObjectCommand(uploadParams));
    } catch (error) {
        // Handle error appropriately
        console.error("Error uploading object:", error);
        throw new Error("Failed to upload object.");
    }
}

async function renameObject(oldKey: string, newKey: string): Promise<void> {
    const copyParams = {
        Bucket: Bucket,
        CopySource: `${Bucket}/${oldKey}`,
        Key: newKey,
    };

    const deleteParams = {
        Bucket: Bucket,
        Key: oldKey,
    };

    try {
        // Copy the object to the new key
        await s3.send(new CopyObjectCommand(copyParams));

        // Delete the old object
        await s3.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
        // Handle error appropriately
        console.error("Error renaming object:", error);
        throw new Error("Failed to rename object.");
    }
}

async function doesObjectExist(key: string): Promise<boolean> {
    const headObjectCommand = new HeadObjectCommand({
        Bucket: Bucket,
        Key: key,
    });

    try {
        // Check if the object exists by sending a headObject request
        await s3.send(headObjectCommand);
        return true; // Object exists
    } catch (error) {
        if (error instanceof NoSuchKey) {
            return false; // Object not found
        }
        throw error; // Throw other errors
    }
}

export async function GET(request: NextRequest, { params }: { params: { key: string } }) {
    const command = new GetObjectCommand({ Bucket: Bucket, Key: params.key });
    const src = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return NextResponse.json({ src });
}

export async function PUT(request: NextRequest, { params }: { params: { key: string } }) {
    const { key } = params;
    const data = request.body;
    const newKey = request.headers.get("New-Key");

    try {
        if (newKey && newKey !== key) {
            // If new key is provided and it's different from the current key, rename the object
            await renameObject(key, newKey);
        }

        // Upload or update the object with the new content
        await uploadObject(newKey || key, data);

        return NextResponse.json({ message: "Object updated successfully.", key: newKey || key });
    } catch (error) {
        console.error("Error updating object:", error);
        return NextResponse.json({ error: "Failed to update object." }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { key: string } }) {
    const { key } = params;

    // Check if key is provided
    if (!key) {
        return NextResponse.json({ error: 'Missing required "key" parameter' }, { status: 400 });
    }

    // Check if the object with the provided key exists in the S3 bucket
    const objectExists = await doesObjectExist(key);
    if (!objectExists) {
        return NextResponse.json({ error: `Object with key "${key}" does not exist` }, { status: 404 });
    }

    const command = new DeleteObjectCommand({
        Bucket,
        Key: key,
    });

    try {
        await s3.send(command);
        return NextResponse.json({ message: "Object deleted successfully.", key });
    } catch (error) {
        console.error("Error deleting object:", error);
        return NextResponse.json({ error: "Failed to delete object." }, { status: 500 });
    }
}
