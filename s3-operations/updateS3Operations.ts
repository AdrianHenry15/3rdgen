import AWS from "aws-sdk";

const s3 = new AWS.S3();

// Function to update a file in S3 bucket
async function updateFileInS3(bucketName: string, key: string, newData: string): Promise<void> {
    try {
        const params = {
            Bucket: bucketName,
            Key: key, // Specify the key of the file to be updated
            Body: newData, // New data to replace the content of the file
        };

        await s3.upload(params).promise();
        console.log(`File updated successfully in ${bucketName}/${key}`);
    } catch (error) {
        console.error("Error updating file in S3:", error);
    }
}

// Function to update a folder in S3 bucket (create a new folder)
async function updateFolderInS3(bucketName: string, folderKey: string): Promise<void> {
    try {
        const params = {
            Bucket: bucketName,
            Key: folderKey, // Specify the key of the new folder to be created
        };

        // Uploading an empty file with the folder key as its key creates a folder in S3
        await s3.upload(params).promise();
        console.log(`Folder created successfully in ${bucketName}/${folderKey}`);
    } catch (error) {
        console.error("Error updating folder in S3:", error);
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
