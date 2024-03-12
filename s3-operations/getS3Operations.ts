import { S3File } from "@/lib/types";
import AWS from "../config/aws.config";

const s3 = new AWS.S3();

export async function getAllFilesFromFolder(bucket: string, folder: string): Promise<S3File[]> {
    try {
        const data = await s3.listObjectsV2({ Bucket: bucket, Prefix: folder }).promise();
        if (!data.Contents) {
            console.log(`No files found in folder '${folder}' in S3 bucket '${bucket}'.`);
            return [];
        }

        const files: S3File[] = await Promise.all(
            data.Contents.map(async (obj) => {
                const fileData = await s3.getObject({ Bucket: bucket, Key: obj.Key! }).promise();
                const content = fileData.Body?.toString("utf-8") || "";
                return { bucket, key: obj.Key!, content };
            })
        );
        return files;
    } catch (error) {
        console.error(`Error fetching files from folder '${folder}' in S3 bucket '${bucket}':`, error);
        return [];
    }
}

export async function getSingleFileFromBucket(bucket: string, key: string): Promise<S3File | null> {
    try {
        const fileData = await s3.getObject({ Bucket: bucket, Key: key }).promise();
        const content = fileData.Body?.toString("utf-8") || "";
        return { bucket, key, content };
    } catch (error) {
        console.error("Error fetching file from S3 bucket:", error);
        return null;
    }
}

export async function getAllFilesFromBucket(bucket: string): Promise<S3File[]> {
    try {
        const data = await s3.listObjectsV2({ Bucket: bucket }).promise();
        if (!data.Contents) {
            console.log("No files found in S3 bucket.");
            return [];
        }

        const filesPromises = data.Contents.map(async (obj) => {
            // Check if the object represents a folder
            const isFolder = obj.Key?.endsWith("/");
            if (isFolder) {
                // Skip folders
                return null;
            }

            const fileData = await s3.getObject({ Bucket: bucket, Key: obj.Key! }).promise();
            const content = fileData.Body?.toString("utf-8") || "";
            return { bucket, key: obj.Key!, content } as S3File;
        });

        const filesResults = await Promise.all(filesPromises);

        // Filter out null values (representing folders)
        const files: S3File[] = filesResults.filter((file) => file !== null) as S3File[];

        return files;
    } catch (error) {
        console.error("Error fetching files from S3 bucket:", error);
        return [];
    }
}

// Example usage:
// const bucketName = 'your-bucket-name';
// const folderName = 'your-folder-name';
// const fileKey = 'your-file-key';

// Get all files from a specific folder in an S3 bucket
// getAllFilesFromFolder(bucketName, folderName)
//   .then(files => {
//     console.log(`Files in folder '${folderName}' in bucket '${bucketName}':`, files);
//   })
//   .catch(error => {
//     console.error("Error getting files from folder:", error);
//   });

// Get a single file from an S3 bucket
// getSingleFileFromBucket(bucketName, fileKey)
//   .then(file => {
//     if (file) {
//       console.log(`Content of file '${fileKey}' in bucket '${bucketName}':`, file.content);
//     } else {
//       console.log(`File '${fileKey}' not found in bucket '${bucketName}'.`);
//     }
//   })
//   .catch(error => {
//     console.error("Error getting file from bucket:", error);
//   });

// Get all files from an entire S3 bucket
// getAllFilesFromBucket(bucketName)
//   .then(files => {
//     console.log(`All files in bucket '${bucketName}':`, files);
//   })
//   .catch(error => {
//     console.error("Error getting files from bucket:", error);
//   });
