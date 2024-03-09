import AWS from "../config/aws.config";

const s3 = new AWS.S3();

export async function getAllFilesFromBucket(bucket: string): Promise<{ key: string; content: string }[]> {
    try {
        const data = await s3.listObjectsV2({ Bucket: bucket }).promise();
        if (data.Contents) {
            const files = await Promise.all(
                data.Contents.map(async (obj) => {
                    const fileData = await s3.getObject({ Bucket: bucket, Key: obj.Key! }).promise();
                    const content = fileData.Body?.toString("utf-8") || "";
                    return { key: obj.Key || "", content };
                })
            );
            return files;
        }
        return [];
    } catch (error) {
        console.error("Error fetching files from S3 bucket:", error);
        return [];
    }
}
