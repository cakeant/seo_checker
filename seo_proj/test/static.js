const SEO_Check = require('../index.js')
const expect = require('chai').expect;
const mocha_sinon = require('mocha-sinon');
const fs = require('fs');

// describe('測試標題', function(){
//     it('測試內容', function(done){
//         // 進行測試
//     })
//     it('測試內容2', function(done){
//         // 進行測試
//     })
// })

describe('testLoadFileStream', function() {
	const myReadStream = fs.createReadStream(__dirname + '/test.html');
	var checker = new SEO_Check({tt:4});
	checker.loadStream(myReadStream);
	
	it('checkImg: should return', function() {
		checker.checkImg();
		expect( checker.formatLog.calledOnce ).to.be.true;
		// expect( console.log.calledWith('[seo-check] img: Failed, 17 img tag(s) without alt attribute found') ).to.be.true;
	});
	// it('checkATag: should log a tag warning', function() {
	// 	//load with readable stream
	// 	checker.loadStream(myReadStream);
	// 	checker.checkATag();
	// 	expect( console.log.calledOnce ).to.be.true;
	// 	// expect( console.log.calledWith('a tag: Failed, 23 a tag(s) without rel attribute found') ).to.be.true;
	// });
	// checkHead();
});


// function testLoadFilePath(){
// 	const fs = require('fs');
// 	const SEO_Check = require('seo_proj');

// 	//load with readable stream
// 	var calc2 = new SEO_Check({tt:4});
// 	calc2.loadFilePath(__dirname + '/test.html')
// 		.checkH1()
// 		.checkStrong();
// }
// testLoadStream();
// testLoadFilePath();