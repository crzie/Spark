export const generateImagePath = (fileName: string) => {
    // get extension
    const extension = fileName.split('.').pop();

    // get unique name by using current time
    const uniqueName = `${new Date().getTime()}.${extension}`;
    return "images/" + uniqueName;
}