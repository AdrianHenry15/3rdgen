import AWS from "aws-sdk";
import fs from "fs";
import path from "path"; // Import the path module

const s3 = new AWS.S3();

// CREATE FILE
export async function uploadFileToS3(filePath: string, bucketName: string, folderName: string): Promise<void> {
    try {
        // Check if the folder exists, if not, create it
        const folderExists = await doesFolderExist(bucketName, folderName);
        if (!folderExists) {
            await createFolderInS3(bucketName, folderName);
        }

        const fileContent = fs.readFileSync(filePath);

        const params = {
            Bucket: bucketName,
            Key: `${folderName}/${path.basename(filePath)}`, // Specify the folder name in the key
            Body: fileContent,
        };

        await s3.upload(params).promise();
        console.log(`File uploaded successfully to ${bucketName}/${folderName}`);
    } catch (error) {
        console.error("Error uploading file to S3:", error);
    }
}

// CREATE FOLDER
async function createFolderInS3(bucketName: string, folderName: string): Promise<void> {
    try {
        const params = {
            Bucket: bucketName,
            Key: `${folderName}/`, // Append a trailing slash to create a folder
            Body: "", // Empty body for a folder
        };

        await s3.upload(params).promise();
        console.log(`Folder '${folderName}' created successfully in bucket '${bucketName}'`);
    } catch (error) {
        console.error("Error creating folder in S3:", error);
    }
}

// CHECK IF FOLDER EXISTS
async function doesFolderExist(bucketName: string, folderName: string): Promise<boolean> {
    try {
        const params = {
            Bucket: bucketName,
            Prefix: `${folderName}/`, // Add trailing slash to indicate folder
            MaxKeys: 1, // Limit the number of keys returned to check if the folder exists
        };

        const data = await s3.listObjectsV2(params).promise();
        return data.Contents !== undefined && data.Contents.length > 0;
    } catch (error) {
        console.error("Error checking if folder exists in S3:", error);
        return false;
    }
}

// Example usage:
// const filePath = 'path/to/your/file.txt';
// const bucketName = 'your-bucket-name';
// const folderName = 'your-folder-name';

// updateFileOrFolderInS3(filePath, bucketName, folderName);
