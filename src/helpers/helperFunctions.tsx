export const generateImagePath = (fileName: string) => {
    // get extension
    const extension = fileName.split('.').pop();

    // get unique name by using current time and random number
    const uniqueName = `${new Date().getTime()}${Math.floor(Math.random() * 100)}.${extension}`;
    return "images/" + uniqueName;
}