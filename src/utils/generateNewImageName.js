export const generateNewImageName = (imageName, currentDateTime) => {
    const regex = new RegExp('[^.]+$');
    const extension = imageName.match(regex);
    const newImageName = imageName.split(extension)[0] + "_" + currentDateTime + "." + extension[0];
    const nameWithoutSpaces = newImageName.replace(" ", "_");
    return nameWithoutSpaces;
}