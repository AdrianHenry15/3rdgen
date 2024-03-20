import { S3Client } from "@aws-sdk/client-s3";

// Get environment variables
const Bucket = process.env.AWS_AUDIO_FILE_BUCKET as string;
const region = process.env.AWS_REGION as string;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

// Initialize S3 client
const s3 = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});

// Export bucket name and S3 client
export { Bucket, s3 };
