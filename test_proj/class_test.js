
// var Ganit = require('class_proj');

// var calc = new Ganit(3);
// var calc2 = new Ganit(3);
// calc.add();
// console.log(calc, calc2);
// console.log(calc.add, calc2.add);


var SEO_Check = require('seo_proj');
var calc = new SEO_Check({tt:3, maxStrongTagCnts: 18});
var calc2 = new SEO_Check({tt:4});
calc.loadStream("stream");
calc.loadFilePath("path");
console.log(calc);
console.log(calc2);
console.log(calc.loadStream, calc2.loadStream);