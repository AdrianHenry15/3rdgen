import { SongType } from "@/lib/types";

// Function to GET ALL SONGS
export async function fetchSongs(): Promise<any> {
    try {
        const response = await fetch("/api/tracks", {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch songs");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching songs:", error);
        throw error;
    }
}

// Function to CREATE NEW SONG
export async function createSong(songData: SongType): Promise<any> {
    try {
        const response = await fetch("/api/tracks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(songData),
        });

        if (!response.ok) {
            throw new Error("Failed to create song");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating song:", error);
        throw error;
    }
}

// ================================================ BY ID
// Function to GET a single song by ID
export async function fetchSongById(id: string): Promise<any> {
    try {
        const response = await fetch(`/api/tracks/${id}`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch song");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching song:", error);
        throw error;
    }
}

// Define a function to DELETE a song by ID
export async function deleteSongById(id: string): Promise<any> {
    try {
        const response = await fetch(`/api/tracks/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete song");
        }

        return "Track deleted successfully"; // No content response
    } catch (error) {
        console.error("Error deleting song:", error);
        throw error;
    }
}

// Define a function to UPDATE a song by ID
export async function updateSongById(id: string, songData: SongType): Promise<any> {
    try {
        const response = await fetch(`/api/tracks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(songData),
        });

        if (!response.ok) {
            throw new Error("Failed to update song");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating song:", error);
        throw error;
    }
}
