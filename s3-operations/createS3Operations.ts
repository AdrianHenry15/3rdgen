import AWS from "aws-sdk"; // Importing AWS SDK
import { Readable } from "stream";

const s3 = new AWS.S3(); // Creating an instance of the S3 service

/**
 * Uploads a file to an S3 bucket within a specified folder.
 * @param filePath - The path to the local file to be uploaded.
 * @param bucketName - The name of the S3 bucket.
 * @param folderName - The name of the folder within the bucket.
 * @returns Promise<void> - A promise that resolves when the file is uploaded successfully.
 */
export async function uploadFileToS3(fileContent: Buffer, fileName: string, bucketName: string): Promise<void> {
    try {
        // Create a Readable stream from the file content
        const fileStream = new Readable();
        fileStream.push(fileContent);
        fileStream.push(null); // End of file

        // Specify the S3 upload parameters
        const params = {
            Bucket: bucketName,
            Key: fileName, // Specify the folder name in the key
            Body: fileStream, // File content as a stream
        };

        // Upload the file to S3
        await s3.upload(params).promise();
        console.log(`File uploaded successfully to ${bucketName}`);
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw error; // Rethrow the error for handling in the caller function
    }
}

/**
 * Creates a folder in an S3 bucket.
 * @param bucketName - The name of the S3 bucket.
 * @param folderName - The name of the folder to be created.
 * @returns Promise<void> - A promise that resolves when the folder is created successfully.
 */
export async function createFolderInS3(bucketName: string, folderName: string): Promise<void> {
    try {
        const params = {
            Bucket: bucketName,
            Key: `${folderName}/`, // Append a trailing slash to create a folder
            Body: "", // Empty body for a folder
        };

        await s3.upload(params).promise(); // Upload empty object to create folder
        console.log(`Folder '${folderName}' created successfully in bucket '${bucketName}'`);
    } catch (error) {
        console.error("Error creating folder in S3:", error); // Log error if any
    }
}

/**
 * Checks if a folder exists in an S3 bucket.
 * @param bucketName - The name of the S3 bucket.
 * @param folderName - The name of the folder to be checked.
 * @returns Promise<boolean> - A promise that resolves to true if the folder exists, otherwise false.
 */
async function doesFolderExist(bucketName: string, folderName: string): Promise<boolean> {
    try {
        const params = {
            Bucket: bucketName,
            Prefix: `${folderName}/`, // Add trailing slash to indicate folder
            MaxKeys: 1, // Limit the number of keys returned to check if the folder exists
        };

        const data = await s3.listObjectsV2(params).promise(); // List objects in folder
        return data.Contents !== undefined && data.Contents.length > 0; // Check if any objects are returned
    } catch (error) {
        console.error("Error checking if folder exists in S3:", error); // Log error if any
        return false;
    }
}

// Example usage:
// const filePath = 'path/to/your/file.txt';
// const bucketName = 'your-bucket-name';
// const folderName = 'your-folder-name';

// uploadFileToS3(filePath, bucketName, folderName);
