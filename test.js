// import Bloom from './Bloom';
let Bloom = require('./Bloom.js');

let bloom = new Bloom();

// Add data
bloom.add("MANISH");
bloom.add("MANISH BISHT");
bloom.add("BISHT");
bloom.add("R");

bloom.check("MANISH") ? console.log("Test #1 Passed") : console.log("Test #1 Failed");
bloom.check("MANISH BISHT") ? console.log("Test #2 Passed") : console.log("Test #2 Failed");
bloom.check("BISHT") ? console.log("Test #3 Passed") : console.log("Test #3 Failed");
bloom.check("9876") ? console.log("Test #4 Failed") : console.log("Test #4 Passed");
bloom.check("1234") ? console.log("Test #5 Failed") : console.log("Test #5 Passed");
