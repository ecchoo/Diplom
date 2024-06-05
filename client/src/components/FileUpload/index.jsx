import React, { useState } from 'react';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';

export const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        // setLoading(true);
        // const formData = new FormData();
        // formData.append('file', selectedFile);

        // try {
        //     const res = await axios.post('http://localhost:3000/upload?avatar', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
        //     setFileUrl(res.data.filePath);
        // } catch (error) {
        //     console.error('Error uploading file:', error);
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : fileUrl ? (
                <img src={fileUrl} alt="Uploaded File" width="100" />
            ) : (
                <label htmlFor="file-upload">
                    <CloudUploadIcon fontSize="large" />
                    <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                </label>
            )}
            {selectedFile && !loading && <button onClick={handleFileUpload}>Upload</button>}
        </div>
    );
};
