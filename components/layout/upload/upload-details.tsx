import Image from "next/image";
import React, { useState } from "react";

interface UploadDetailsProps {
    uploading: boolean;
}

const detailsStyles: React.CSSProperties = {
    border: "2px dashed #ccc",
    borderRadius: "4px",
    padding: "20px",
    marginBottom: "20px",
};

const previewStyles: React.CSSProperties = {
    maxWidth: "100%",
    maxHeight: "200px",
    marginTop: "10px",
};

const UploadDetails: React.FC<UploadDetailsProps> = ({ uploading }) => {
    const [songName, setSongName] = useState("");
    const [bpm, setBpm] = useState("");
    const [key, setKey] = useState("");
    const [genre, setGenre] = useState("");
    const [tags, setTags] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImage(file || null);
    };

    return (
        <div className="flex flex-col" style={detailsStyles}>
            <h2 className="font-semibold text-white text-[30px]">Track Details</h2>
            <div className="flex items-start">
                {/* IMAGE */}
                <div>
                    {/* Upload image portion */}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {/* Display image preview if an image is selected */}
                    {image && (
                        <div>
                            <Image
                                width={75}
                                height={75}
                                className="aspect-square"
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                style={previewStyles}
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col items-start">
                        <label className="font-semibold text-md text-white" htmlFor="song-name">
                            Song Name:
                        </label>
                        <input type="text" placeholder="Song Name" value={songName} onChange={(e) => setSongName(e.target.value)} />
                    </div>
                    <div className="flex flex-col items-start">
                        <label className="font-semibold text-md text-white" htmlFor="song-name">
                            BPM:
                        </label>
                        <input type="text" placeholder="BPM" value={bpm} onChange={(e) => setBpm(e.target.value)} />
                    </div>
                    <div className="flex flex-col items-start">
                        <label className="font-semibold text-md text-white" htmlFor="song-name">
                            Song Key:
                        </label>
                        <input type="text" placeholder="Key" value={key} onChange={(e) => setKey(e.target.value)} />
                    </div>
                    <div className="flex flex-col items-start">
                        <label className="font-semibold text-md text-white" htmlFor="song-name">
                            Genre:
                        </label>
                        <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                    </div>
                    <div className="flex flex-col items-start">
                        <label className="font-semibold text-md text-white" htmlFor="song-name">
                            Tags:
                        </label>
                        <input type="text" placeholder="Tags" value={tags} onChange={(e) => setTags(e.target.value)} />
                    </div>
                </div>
            </div>
            {/* Add a loading bar here for file upload progress */}
        </div>
    );
};

export default UploadDetails;
