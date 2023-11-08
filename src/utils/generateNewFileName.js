/**
 * Generates a new file name by appending the current date and time to the given image name.
 *
 * @param {string} imageName - The name of the image.
 * @param {string} currentDateTime - The current date and time.
 * @return {string} The new file name with the current date and time appended.
 */

export const generateNewFileName = (imageName, currentDateTime) => {
    const regex = new RegExp('[^.]+$');
    const extension = imageName.match(regex);
    const newImageName = imageName.split(extension)[0] + "_" + currentDateTime + "." + extension[0];
    const nameWithoutSpaces = newImageName.replace(" ", "_");
    return nameWithoutSpaces;
}