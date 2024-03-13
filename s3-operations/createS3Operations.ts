import AWS from "aws-sdk"; // Importing AWS SDK
import fs from "fs"; // Importing fs module for file system operations
import path from "path"; // Importing the path module for path manipulation

const s3 = new AWS.S3(); // Creating an instance of the S3 service

/**
 * Uploads a file to an S3 bucket within a specified folder.
 * @param filePath - The path to the local file to be uploaded.
 * @param bucketName - The name of the S3 bucket.
 * @param folderName - The name of the folder within the bucket.
 * @returns Promise<void> - A promise that resolves when the file is uploaded successfully.
 */
export async function uploadFileToS3(filePath: string, bucketName: string, folderName: string): Promise<void> {
    try {
        // Check if the folder exists, if not, create it
        const folderExists = await doesFolderExist(bucketName, folderName);
        if (!folderExists) {
            await createFolderInS3(bucketName, folderName);
        }

        const fileContent = fs.readFileSync(filePath); // Read file content

        const params = {
            Bucket: bucketName,
            Key: `${folderName}/${path.basename(filePath)}`, // Specify the folder name in the key
            Body: fileContent, // File content
        };

        await s3.upload(params).promise(); // Upload file to S3
        console.log(`File uploaded successfully to ${bucketName}/${folderName}`);
    } catch (error) {
        console.error("Error uploading file to S3:", error); // Log error if any
    }
}

/**
 * Creates a folder in an S3 bucket.
 * @param bucketName - The name of the S3 bucket.
 * @param folderName - The name of the folder to be created.
 * @returns Promise<void> - A promise that resolves when the folder is created successfully.
 */
async function createFolderInS3(bucketName: string, folderName: string): Promise<void> {
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
