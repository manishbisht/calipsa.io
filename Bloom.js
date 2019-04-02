var mmh3 = require('murmurhash3');

class Bloom {
    constructor() {
        // Initialize an array length 2 ^ 32 with empty values
        this.bitArray = new Array(4294967295);
    }

    // Convert Text to 32 Bit Integer (in Decimal)
    convertTextToDecimalNumber(text) {
        return mmh3.murmur32Sync(text);
    }

    // Convert 32 Bit Integer (in Decimal) to Binary String
    convertDecimalNumberToBitString(decimalNumber) {
        let stringArray = [];
        let i = 0;
        do {
            let index = (decimalNumber % 2) + (10 * i);
            stringArray.push(index);
            decimalNumber = parseInt(decimalNumber / 2);
        } while (decimalNumber > 0);
        return stringArray.join("");
    }

    // Add the string to the filter
    add(text) {
        let decimalNumber = this.convertTextToDecimalNumber(text);
        let bitString = this.convertDecimalNumberToBitString(decimalNumber);
        for (let i = 0; i < bitString.length; i++) {
            if (bitString[i] === '1') {
                this.bitArray[i] = true;
            }
        }
    }

    // Check if value is present
    check(text) {
        let isPresent = true;
        let decimalNumber = this.convertTextToDecimalNumber(text);
        let bitString = this.convertDecimalNumberToBitString(decimalNumber);
        for (let i = 0; i < bitString.length; i++) {
            if (isPresent && bitString[i] === '1') {
                isPresent = this.bitArray[i] || false;
            }
        }
        return isPresent;
    }
}

module.exports = Bloom;