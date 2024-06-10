export const getFileName = (filePath) => {
    const urlObject = new URL(filePath);
    const pathname = urlObject.pathname;
    const fileName = pathname.substring(pathname.lastIndexOf('/') + 1);

    return fileName
}