const fs = require('fs');
// var Ganit = require('class_proj');

// var calc = new Ganit(3);
// var calc2 = new Ganit(3);
// calc.add();
// console.log(calc, calc2);
// console.log(calc.add, calc2.add);


var SEO_Check = require('seo_proj');
var calc = new SEO_Check({tt:3, maxStrongTagCnts: 18});
// var calc2 = new SEO_Check({tt:4});
const myReadStream = fs.createReadStream(__dirname + '/test.html');
calc.loadStream(myReadStream);
calc.checkImg()
	.checkATag()
	.checkHead();
// calc.loadFilePath(__dirname + '/test_vpon.html');
// console.log(calc);
// console.log(calc2);
// console.log(calc.loadStream, calc2.loadStream);