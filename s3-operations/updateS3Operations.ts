import AWS from "aws-sdk"; // Importing AWS SDK

const s3 = new AWS.S3(); // Creating an instance of the S3 service

/**
 * Updates a file in an S3 bucket with new data.
 * @param bucketName - The name of the S3 bucket.
 * @param key - The key of the file to be updated.
 * @param newData - The new data to replace the content of the file.
 * @returns Promise<void> - A promise that resolves when the file is updated successfully.
 */
export async function updateFileInS3(bucketName: string, key: string, newData: string): Promise<void> {
    try {
        const params = {
            Bucket: bucketName,
            Key: key, // Specify the key of the file to be updated
            Body: newData, // New data to replace the content of the file
        };

        await s3.upload(params).promise(); // Upload new data to update the file
        console.log(`File updated successfully in ${bucketName}/${key}`);
    } catch (error) {
        console.error("Error updating file in S3:", error); // Log error if any
    }
}

/**
 * Updates a folder in an S3 bucket (creates a new folder).
 * @param bucketName - The name of the S3 bucket.
 * @param folderKey - The key of the new folder to be created.
 * @returns Promise<void> - A promise that resolves when the folder is created successfully.
 */
export async function updateFolderInS3(bucketName: string, folderKey: string): Promise<void> {
    try {
        const params = {
            Bucket: bucketName,
            Key: folderKey, // Specify the key of the new folder to be created
        };

        // Uploading an empty file with the folder key as its key creates a folder in S3
        await s3.upload(params).promise(); // Upload empty file to create folder
        console.log(`Folder created successfully in ${bucketName}/${folderKey}`);
    } catch (error) {
        console.error("Error updating folder in S3:", error); // Log error if any
    }
}

// Example usage:
// const bucketName = "your-bucket-name";
// const fileKey = "your-folder-name/your-file.txt"; // Specify the key of the file
// const folderKey = "your-new-folder/"; // Specify the key of the new folder

// const newData = "New content for the file"; // New data to update the file

// Update file
// updateFileInS3(bucketName, fileKey, newData);

// Update folder (create a new folder)
// updateFolderInS3(bucketName, folderKey);
