// Function to FETCH ALL IMAGES in bucket
export async function fetchImages(): Promise<any> {
    try {
        const response = await fetch("/api/audio-files", {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch files");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching files:", error);
        throw error;
    }
}

// Function to UPLOAD IMAGE
export async function uploadImage(file: File): Promise<any> {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/audio-files", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to upload file");
        }

        return await response.json();
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}

// =================================================== BY ID ===================================================

// Define a function to get a signed URL for an object
export async function getImageURL(key: string): Promise<string> {
    try {
        const response = await fetch(`/api/audio-files/${key}`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Failed to get signed URL");
        }
        const data = await response.json();
        return data.src;
    } catch (error) {
        console.error("Error getting signed URL:", error);
        throw error;
    }
}

// Function to UPDATE IMAGE
export async function updateImage(key: string, data: any, newKey?: string): Promise<any> {
    try {
        const headers: { [key: string]: string } = {};
        if (newKey) {
            headers["New-Key"] = newKey;
        }

        const response = await fetch(`/api/audio-files/${key}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to update object");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating object:", error);
        throw error;
    }
}

// Function to DELETE IMAGE
export async function deleteImage(key: string): Promise<any> {
    try {
        const response = await fetch(`/api/audio-files/${key}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete object");
        }

        return await response.json();
    } catch (error) {
        console.error("Error deleting object:", error);
        throw error;
    }
}
