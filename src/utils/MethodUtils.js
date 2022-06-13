function removeFirstWord(str) {
    const indexOfSpace = str.indexOf(' ');

    // 👇️ if you want to keep single words, delete this
    // if (indexOfSpace === -1) {
    //   return '';
    // }

    return str.substring(indexOfSpace + 1);
}

const utils = {
    removeFirstWord
}

export default utils