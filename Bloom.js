var mmh3 = require('murmurhash3');

class Bloom {
    constructor() {
        this.bitArray = new Array(4294967295);
    }

    convertTextToDecimalNumber(text) {
        return mmh3.murmur32Sync(text);
    }

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

    add(text) {
        let decimalNumber = this.convertTextToDecimalNumber(text);
        let bitString = this.convertDecimalNumberToBitString(decimalNumber);
        for (let i = 0; i < bitString.length; i++) {
            if (bitString[i] === '1') {
                this.bitArray[i] = true;
            }
        }
    }

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