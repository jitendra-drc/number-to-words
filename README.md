
# Number to Words Converter

This project provides a JavaScript function to convert numbers into their textual representation. It supports numbers up to 999,999,999 and handles formatting for common large number units (e.g., thousand, lakh, crore).

## Features
- Converts numbers to words for values from 0 to 999,999,999.
- Supports international number units like thousand, lakh, and crore.
- Handles edge cases, such as numbers outside the valid range.

## Example
Input:
```javascript
const text = numberToWords(1111);
console.log(text);
