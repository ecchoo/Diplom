import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { DropZoneContainer, Placeholder, Preview } from './styled';

export const Dropzone = ({ onDrop }) => {
    const [preview, setPreview] = useState(null);

    const handleDrop = (acceptedFiles) => {
        setPreview(URL.createObjectURL(acceptedFiles[0]))
        onDrop(acceptedFiles[0])
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*',
        multiple: false
    })

    return (
        <DropZoneContainer
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            {preview && <Preview src={preview} alt='Preview' />}
            {isDragActive ? (
                <Placeholder>Перетащите сюда файл...</Placeholder>
            ) : (
                <>
                    <Placeholder>Логотип</Placeholder>
                </>
            )}
        </DropZoneContainer>
    )
}