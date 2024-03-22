// Function to FETCH ALL FOLDERS
export async function fetchFolders(): Promise<any> {
    try {
        const response = await fetch("/api/image-folders", {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch folders");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching folders:", error);
        throw error;
    }
}

// Function to CREATE a new folder
export async function createFolder(folderName: string): Promise<any> {
    try {
        const response = await fetch("/api/image-folders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ folderName }),
        });

        if (!response.ok) {
            throw new Error("Failed to create folder");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating folder:", error);
        throw error;
    }
}

// =========================================== BY ID ===========================================

// Function to GET SPECIFIC FOLDER CONTENTS
export async function getFolderContents(key: string): Promise<any> {
    try {
        const response = await fetch(`/api/image-folders/${key}`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch folder contents");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching folder contents:", error);
        throw error;
    }
}

// Function to RENAME FOLDER
export async function renameFolder(key: string, newKey: string): Promise<any> {
    try {
        const response = await fetch(`/api/image-folders/${key}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newKey }),
        });

        if (!response.ok) {
            throw new Error("Failed to rename folder");
        }

        return await response.json();
    } catch (error) {
        console.error("Error renaming folder:", error);
        throw error;
    }
}

// Function to DELETE FOLDER
export async function deleteFolder(key: string): Promise<any> {
    try {
        const response = await fetch(`/api/image-folders/${key}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete folder");
        }

        return await response.json();
    } catch (error) {
        console.error("Error deleting folder:", error);
        throw error;
    }
}
