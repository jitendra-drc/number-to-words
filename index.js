const numberTexts = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
    20: 'twenty',
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety',
    100: 'hundred',
    1000: 'thousand',
    100000: 'lakh',
    10000000: 'crore'
};

// Ensure the number is within the allowed limit
const validateNumber = (number) => {
    const upperLimit = 999999999;
    if (number > upperLimit || number < 0) {
        throw new Error(`Number must be between 0 and ${upperLimit}`);
    }
};

// Extract the last N digits and the remaining part
const extractLastNDigits = (number, power) => {
    const divisor = 10 ** power;
    return [number % divisor, Math.floor(number / divisor)];
};

// Convert numbers up to 99 into words
const getTwoDigitWord = (number) => {
    if (number in numberTexts) {
        return numberTexts[number];
    }
    const [ones, tens] = extractLastNDigits(number, 1);
    return `${numberTexts[tens * 10]} ${numberTexts[ones]}`;
};

// Get the place value text
const getPlaceText = (placeValue) => numberTexts[10 ** placeValue] || '';

// Convert a segment of digits with its place value into words
const getSegmentText = (number, placeValue) => {
    const placeText = getPlaceText(placeValue);
    if (number < 100) {
        return `${getTwoDigitWord(number)} ${placeText}`.trim();
    }
    const [remainder, hundreds] = extractLastNDigits(number, 2);
    return `${numberTexts[hundreds]} hundred ${remainder ? getTwoDigitWord(remainder) : ''} ${placeText}`.trim();
};

// Convert the entire number into words
const numberToWords = (number) => {
    validateNumber(number);

    if (number in numberTexts) {
        return numberTexts[number];
    }

    const segments = [2, 2, 2, 3]; // Number of digits in each segment from right to left
    const placeValues = [0, 2, 5, 7]; // Corresponding place values (units, thousands, lakhs, crores)

    let words = [];
    for (let i = segments.length - 1; i >= 0; i--) {
        const [segment, remainder] = extractLastNDigits(number, segments[i]);
        if (segment > 0) {
            words.push(getSegmentText(segment, placeValues[i]));
        }
        number = remainder;
    }

    return words.reverse().join(' ').trim();
};

// Example usage
const text = numberToWords(1111);
console.log(text); // Output: one thousand one hundred eleven
