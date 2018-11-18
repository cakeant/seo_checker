const SEO_Check = require('../index.js')
// const mocha_sinon = require('mocha-sinon');
const fs = require('fs');

const chai = require('chai');
const chaiFiles = require('chai-files');
chai.use(chaiFiles);

const expect = chai.expect;
const defaultOptions = require('../lib/options');
const file = chaiFiles.file;

// describe('測試標題', function(){
//     it('測試內容', function(done){
//         // 進行測試
//     })
//     it('測試內容2', function(done){
//         // 進行測試
//     })
// })


describe('unit test', function() {

	it("checkMaxStrongCnts", function(){
		var checker = new SEO_Check({maxStrongTagCnts:4});
		expect( checker.checkMaxStrongCnts() ).to.equal( defaultOptions.default.DEFAULT_MAX_STRONG_CNTS );
		expect( checker.checkMaxStrongCnts(2) ).to.equal(2);
		expect( checker.checkMaxStrongCnts("2") ).to.equal(2);
		expect( checker.checkMaxStrongCnts("a") ).to.equal( defaultOptions.default.DEFAULT_MAX_STRONG_CNTS );
		expect( checker.checkMaxStrongCnts(2.5) ).to.equal(2);
		expect( checker.checkMaxStrongCnts(-1) ).to.equal(1);
	});

	it("formatLog", async function(){
		var output = __dirname + '/formatLog_test.txt';
		var checker = new SEO_Check({maxStrongTagCnts:4});
		checker._outputStream = fs.createWriteStream( output );
		checker.formatLog();
		checker.formatLog("");
		checker.formatLog(1);
		checker.formatLog("aaaaaaaa");
		checker.formatLog("bbbbbbbb");
		checker._outputStream.end()
		await SEO_Check.streamPromise( checker._outputStream );

		//check file exsit
		var tmpFile = file(output);
		expect( tmpFile ).to.exist;

		expect( tmpFile ).to.contains('\r\n \r\n1 \r\naaaaaaaa \r\nbbbbbbbb \r\n');
	});

	it("formatLogWithTitle", async function(){
		var output = __dirname + '/formatLogWithTitle_test.txt';
		var checker = new SEO_Check({maxStrongTagCnts:4});
		checker._outputStream = fs.createWriteStream( output );
		checker.formatLogWithTitle();
		checker.formatLogWithTitle({});
		checker.formatLogWithTitle("");
		checker.formatLogWithTitle(1);
		checker.formatLogWithTitle("aaaaaaaa");
		checker.formatLogWithTitle(undefined,"dddd");
		checker.formatLogWithTitle("","eeee");
		checker.formatLogWithTitle(1,"dddd");
		checker.formatLogWithTitle("bbbbbbbb","ccccc");
		checker._outputStream.end()
		await SEO_Check.streamPromise( checker._outputStream );

		//check file exsit
		var tmpFile = file(output);
		expect( tmpFile ).to.exist;

		expect( tmpFile ).to.contains(' \r\n[object Object] \r\n \r\n1 \r\naaaaaaaa           \r\n dddd \r\n eeee \r\n1 dddd \r\nbbbbbbbb           ccccc \r\n');
	});
});