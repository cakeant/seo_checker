const SEO_Check = require('../index.js')
const mocha_sinon = require('mocha-sinon');
const fs = require('fs');

const chai = require('chai');
const chaiFiles = require('chai-files');
chai.use(chaiFiles);

const expect = chai.expect;
const file = chaiFiles.file;

// describe('測試標題', function(){
//     it('測試內容', function(done){
//         // 進行測試
//     })
//     it('測試內容2', function(done){
//         // 進行測試
//     })
// })

/*
來不及了, 先弄幾個integration測吧-.-
TODO:
1. console testing
2. unit testing
*/

describe('testLoadFileStream', function() {

	//setup extra rule
	SEO_Check.registerRule("checkRobotMeta",function() {
		$ = this.result;
		//request succ
		let tagList = $('meta[name="robots"]');
		if( this.options.debug ) this.formatLog("robot cnt:",tagList.length);

		this.formatLog("robot rule is working!");

		//check robot
		( 0==tagList.length )
			? this.formatLogWithTitle("robot meta:","Failed, no robot meta found")
			: this.formatLogWithTitle("robot meta:","OK");
	});

	//integration test pos
	it('positive sample', async function() {
		const input = __dirname + '/input/pos.html';
		const output = __dirname + '/output/pos_output.txt';

		var checker = new SEO_Check({maxStrongTagCnts:4});
		const myWriteStream = fs.createWriteStream( output );
		checker.loadFilePath(input, SEO_Check.e_OUTPUT.STREAM, myWriteStream);
		checker.checkImg()
			.checkATag()
			.checkHead()
			.checkH1()
			.checkStrong()
			.checkRobotMeta().end();
		await checker.getPromise();

		//check file exsit
		const tmpFile = file(output);
		// console.log(tmpFile);
		expect(tmpFile).to.exist;

		//sample testing
		expect(tmpFile).to.contain('img:               OK');
		expect(tmpFile).to.contain('a tag:             OK');
		expect(tmpFile).to.contain('title:             OK');
		expect(tmpFile).to.contain('description meta:  OK');
		expect(tmpFile).to.contain('keywords meta:     OK');
		expect(tmpFile).to.contain('h1:                OK');
		expect(tmpFile).to.contain('strong tag:        OK');
		expect(tmpFile).to.contain('robot rule is working!');
		expect(tmpFile).to.contain('robot meta:        OK');
	});

	it('negitive sample', async function() {
		const input = __dirname + '/input/neg.html';
		const output = __dirname + '/output/neg_output.txt';

		var checker = new SEO_Check({maxStrongTagCnts:4});
		const myWriteStream = fs.createWriteStream( output );
		checker.loadFilePath(input, SEO_Check.e_OUTPUT.STREAM, myWriteStream);
		checker.checkImg()
			.checkATag()
			.checkHead()
			.checkH1()
			.checkStrong()
			.checkRobotMeta().end();
		await checker.getPromise();
		//check file exsit
		expect(file(output)).to.exist;

		//sample testing
		const tmpFile = file(output);
		expect(tmpFile).to.contains('img:               Failed, 15 img tag(s) without alt attribute found');
		expect(tmpFile).to.contains('a tag:             Failed, 128 a tag(s) without rel attribute found');
		expect(tmpFile).to.contains('title:             Failed, no title tag found');
		expect(tmpFile).to.contains('description meta:  Failed, no description meta found');
		expect(tmpFile).to.contains('keywords meta:     Failed, no keywords meta found');
		expect(tmpFile).to.contains('h1:                Failed, more than 1 <h1> found');
		expect(tmpFile).to.contains('strong tag:        Failed, too many <strong> tags (<=4)');
		expect(tmpFile).to.contains('robot rule is working!');
		expect(tmpFile).to.contains('robot meta:        Failed, no robot meta found');
	});

	it('empty sample', async function() {
		const input = __dirname + '/input/neg.html';
		const output = __dirname + '/output/neg_output.txt';

		var checker = new SEO_Check({maxStrongTagCnts:4});
		const myWriteStream = fs.createWriteStream( output );
		checker.loadFilePath(input, SEO_Check.e_OUTPUT.STREAM, myWriteStream);
		checker.checkImg()
			.checkATag()
			.checkHead()
			.checkH1()
			.checkStrong()
			.checkRobotMeta().end();
		await checker.getPromise();
		//check file exsit
		expect(file(output)).to.exist;

		//sample testing
		const tmpFile = file(output);
		expect(tmpFile).to.contains('img:               Failed, 15 img tag(s) without alt attribute found');
		expect(tmpFile).to.contains('a tag:             Failed, 128 a tag(s) without rel attribute found');
		expect(tmpFile).to.contains('title:             Failed, no title tag found');
		expect(tmpFile).to.contains('description meta:  Failed, no description meta found');
		expect(tmpFile).to.contains('keywords meta:     Failed, no keywords meta found');
		expect(tmpFile).to.contains('h1:                Failed, more than 1 <h1> found');
		expect(tmpFile).to.contains('strong tag:        Failed, too many <strong> tags (<=4)');
		expect(tmpFile).to.contains('robot rule is working!');
		expect(tmpFile).to.contains('robot meta:        Failed, no robot meta found');
	});
});