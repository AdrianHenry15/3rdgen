import { NextResponse } from "next/server";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const Bucket = process.env.AWS_AUDIO_FILE_BUCKET as string;
const s3 = new S3Client({
    region: process.env.AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

export async function GET(request: Request, { params }: { params: { key: string } }) {
    const command = new GetObjectCommand({ Bucket, Key: params.key });
    const src = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return NextResponse.json({ src });
}

export async function PUT(request: Request, { params, body }: { params: { key: string }; body: any }) {
    const { key } = params;
    const { data } = await request.json();

    const command = new PutObjectCommand({
        Bucket,
        Key: key,
        Body: JSON.stringify(data), // Adjust as needed based on your data format
    });

    try {
        await s3.send(command);
        return NextResponse.json({ message: "Object uploaded successfully." });
    } catch (error) {
        console.error("Error uploading object:", error);
        return NextResponse.json({ error: "Failed to upload object." }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { key: string } }) {
    const { key } = params;

    const command = new DeleteObjectCommand({
        Bucket,
        Key: key,
    });

    try {
        await s3.send(command);
        return NextResponse.json({ message: "Object deleted successfully." });
    } catch (error) {
        console.error("Error deleting object:", error);
        return NextResponse.json({ error: "Failed to delete object." }, { status: 500 });
    }
}
