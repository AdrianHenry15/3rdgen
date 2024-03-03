import { AllSearchTracks } from "@/lib/tracks";
import AWS from "aws-sdk";

// Configure AWS with your credentials
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION, // e.g. 'us-east-1'
});

// Create an S3 instance
const s3 = new AWS.S3();

// Define the parameters for the upload
const uploadParams: AWS.S3.PutObjectRequest = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: "data.json", // The name you want to give to the file in S3
    Body: JSON.stringify(AllSearchTracks), // Convert your data to JSON string
};

// Upload the data to S3
s3.upload(uploadParams, function (err: any, data: any) {
    if (err) {
        console.error("Error uploading data:", err);
    } else {
        console.log("Upload successful. Data location:", data.Location);
    }
});
