import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { DropZoneContainer, DropZone, Placeholder, Preview } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '@/api'
import { setCourse } from '@/store/reducers';
import { FormHelperText } from '@mui/material';

export const CourseLoogoAddition = ({ error, helperText }) => {
    const dispatch = useDispatch()
    const { courseCreateUpdate: { course } } = useSelector(state => state)

    const handleDrop = async (acceptedFiles) => {
        const { data: { filePath } } = await uploadFile({ file: acceptedFiles[0], type: 'logo' })
        dispatch(setCourse({ ...course, logo: filePath }))
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*',
        multiple: false
    })

    return (
        <DropZoneContainer error={error}>
            <DropZone
                error={error}   
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                {course.logo && <Preview src={course.logo} alt='Preview' />}
                {isDragActive ? (
                    <Placeholder>Перетащите сюда файл...</Placeholder>
                ) : (
                    <>
                        <Placeholder>Логотип</Placeholder>
                    </>
                )}
            </DropZone>
            <FormHelperText>{helperText}</FormHelperText>
        </DropZoneContainer>
    )
}