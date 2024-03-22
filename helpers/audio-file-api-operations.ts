// Function to FETCH ALL files
export async function fetchAllAudioFiles(): Promise<any> {
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

// Function to UPLOAD a file
export async function uploadAudioFile(file: File): Promise<any> {
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

// ======================================= BY KEY =======================================

// Define a Function to FETCH a signed URL for an object
export async function getAudioFileURL(key: string): Promise<string> {
    try {
        const response = await fetch(`/api/audio-files/${key}`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch signed URL");
        }
        const data = await response.json();
        return data.src;
    } catch (error) {
        console.error("Error fetching signed URL:", error);
        throw error;
    }
}

// Function to UPDATE and/or UPLOAD AUDIO FILE
export async function uploadOrUpdateAudioFile(key: string, data: any, newKey?: string): Promise<any> {
    try {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (newKey) {
            headers["New-Key"] = newKey;
        }

        const response = await fetch(`/api/audio-files/${key}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to upload/update object");
        }

        return await response.json();
    } catch (error) {
        console.error("Error uploading/updating object:", error);
        throw error;
    }
}

// Function to DELETE AUDIO FILE
export async function deleteAudioFile(key: string): Promise<any> {
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
