import { S3FileRef } from "@/lib/types"; // Importing S3FileRef type for type safety
import AWS from "../config/aws.config"; // Importing AWS SDK

const s3 = new AWS.S3(); // Creating an instance of the S3 service

/**
 * Retrieves all files from a specific folder in an S3 bucket.
 * @param bucket - The name of the S3 bucket.
 * @param folder - The folder path within the bucket.
 * @returns Promise<S3FileRef[]> - A promise that resolves to an array of S3FileRef objects representing files in the folder.
 */
export async function getAllFilesFromFolder(bucket: string, folder: string): Promise<S3FileRef[]> {
    try {
        const data = await s3.listObjectsV2({ Bucket: bucket, Prefix: folder }).promise(); // List objects in the specified folder
        if (!data.Contents) {
            console.log(`No files found in folder '${folder}' in S3 bucket '${bucket}'.`); // Log if no files found
            return [];
        }

        const files: S3FileRef[] = await Promise.all(
            data.Contents.map(async (obj) => {
                const fileData = await s3.getObject({ Bucket: bucket, Key: obj.Key! }).promise(); // Get object data
                const content = fileData.Body?.toString("utf-8") || ""; // Convert file content to string
                return { bucket, key: obj.Key!, content }; // Return S3FileRef object
            })
        );
        return files;
    } catch (error) {
        console.error(`Error fetching files from folder '${folder}' in S3 bucket '${bucket}':`, error); // Log error if any
        return [];
    }
}

/**
 * Retrieves a single file from an S3 bucket.
 * @param bucket - The name of the S3 bucket.
 * @param key - The key of the file.
 * @returns Promise<S3FileRef | null> - A promise that resolves to an S3FileRef object representing the file if found, otherwise null.
 */
export async function getSingleFileFromBucket(bucket: string, key: string): Promise<S3FileRef | null> {
    try {
        const fileData = await s3.getObject({ Bucket: bucket, Key: key }).promise(); // Get object data
        const content = fileData.Body?.toString("utf-8") || ""; // Convert file content to string
        return { bucket, key, content }; // Return S3FileRef object
    } catch (error) {
        console.error("Error fetching file from S3 bucket:", error); // Log error if any
        return null;
    }
}

/**
 * Retrieves all files from an entire S3 bucket.
 * @param bucket - The name of the S3 bucket.
 * @returns Promise<S3FileRef[]> - A promise that resolves to an array of S3FileRef objects representing files in the bucket.
 */
export async function getAllFilesFromBucket(bucket: string): Promise<S3FileRef[]> {
    try {
        const data = await s3.listObjectsV2({ Bucket: bucket }).promise(); // List all objects in the bucket
        if (!data.Contents) {
            console.log("No files found in S3 bucket."); // Log if no files found
            return [];
        }

        const filesPromises = data.Contents.map(async (obj) => {
            const isFolder = obj.Key?.endsWith("/"); // Check if object represents a folder
            if (isFolder) {
                return null; // Skip folders
            }

            const fileData = await s3.getObject({ Bucket: bucket, Key: obj.Key! }).promise(); // Get object data
            const content = fileData.Body?.toString("utf-8") || ""; // Convert file content to string
            return { bucket, key: obj.Key!, content } as S3FileRef; // Return S3FileRef object
        });

        const filesResults = await Promise.all(filesPromises);
        const files: S3FileRef[] = filesResults.filter((file) => file !== null) as S3FileRef[]; // Filter out null values (folders)
        return files;
    } catch (error) {
        console.error("Error fetching files from S3 bucket:", error); // Log error if any
        return [];
    }
}

// Example usage:
// const bucketName = 'your-bucket-name';
// const folderName = 'your-folder-name';
// const fileKey = 'your-file-key';

// Usage examples commented below each function definition
