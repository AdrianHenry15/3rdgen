import { S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const Bucket = process.env.AWS_IMAGE_BUCKET as string;
const s3 = new S3Client({
    region: process.env.AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

export async function GET(request: NextRequest) {}
export async function POST(request: NextRequest) {}
