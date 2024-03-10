import AWS from "aws-sdk";

// Create an instance of the AWS S3 service
const s3 = new AWS.S3();

// Function to delete a file from S3 bucket
export async function deleteFileFromS3(bucketName: string, key: string): Promise<void> {
    try {
        // Specify parameters for the delete operation
        const params = {
            Bucket: bucketName, // Name of the bucket
            Key: key, // Key of the file to be deleted
        };

        // Perform the delete operation using the deleteObject method
        await s3.deleteObject(params).promise();
        console.log(`File deleted successfully from ${bucketName}/${key}`);
    } catch (error) {
        console.error("Error deleting file from S3:", error);
    }
}

// Function to delete a folder and its contents from S3 bucket
export async function deleteFolderFromS3(bucketName: string, folderKey: string): Promise<void> {
    try {
        // Specify parameters for listing objects in the folder
        const params = {
            Bucket: bucketName, // Name of the bucket
            Prefix: folderKey, // Prefix of the folder to be deleted
        };

        // Retrieve the list of objects in the folder using listObjectsV2 method
        const data = await s3.listObjectsV2(params).promise();

        // Check if the folder contains any objects
        if (data.Contents) {
            // Create an object to store parameters for the deleteObjects operation
            const deleteParams: AWS.S3.DeleteObjectsRequest = {
                Bucket: bucketName, // Name of the bucket
                Delete: { Objects: [] }, // List of objects to be deleted
            };

            // Iterate through each object in the folder
            data.Contents.forEach((content) => {
                // Add the object's key to the list of objects to be deleted
                if (content.Key) {
                    deleteParams.Delete.Objects.push({ Key: content.Key });
                }
            });

            // Check if there are objects to be deleted
            if (deleteParams.Delete.Objects.length > 0) {
                // Perform the delete operation using deleteObjects method
                await s3.deleteObjects(deleteParams).promise();
                console.log(`Folder and its contents deleted successfully from ${bucketName}/${folderKey}`);
            } else {
                console.log(`No contents found in the folder ${bucketName}/${folderKey}`);
            }
        } else {
            console.log(`No contents found in the folder ${bucketName}/${folderKey}`);
        }
    } catch (error) {
        console.error("Error deleting folder from S3:", error);
    }
}

// Example usage:
// const bucketName = 'your-bucket-name';
// const fileKey = 'your-folder-name/your-file.txt'; // Specify the key of the file
// const folderKey = 'your-folder-name/'; // Specify the key of the folder

// Delete file
// deleteFileFromS3(bucketName, fileKey);

// Delete folder
// deleteFolderFromS3(bucketName, folderKey);
