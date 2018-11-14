const fs = require('fs');
const SEO_Check = require('seo_proj');

//load with readable stream
const checker = new SEO_Check({debug:true, maxStrongTagCnts: 18});
const myReadStream = fs.createReadStream(__dirname + '/test_vpon.html');
checker.loadStream(myReadStream);
checker.checkImg()
	.checkATag()
	.checkHead();

//load with a file path
var checker2 = new SEO_Check({maxStrongTagCnts:4});
checker2.loadFilePath(__dirname + '/test_vpon.html')
	.checkH1()
	.checkStrong();