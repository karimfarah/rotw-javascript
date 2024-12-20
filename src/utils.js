function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getColorAt(x, y) {
    const imageData = ctx.getImageData(x, y, 1, 1);
    imageData.willReadFrequently = true;

    const data = imageData.data;
    return {
        r: data[0], g: data[1], b: data[2], a: data[3]
    };
}

// Function to remove a specific element by value
function removeElementByValue(arr, index) {
    arr.splice(index, 1);
}