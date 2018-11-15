const fs = require('fs');
const SEO_Check = require('@glorialin/seo_checker');

//register rules
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

//check 1, input: ReadStream, output: WriteStream
const checker = new SEO_Check({debug:false, maxStrongTagCnts: 4});
const myReadStream = fs.createReadStream(__dirname + '/test.html');
const myWriteStream = fs.createWriteStream(__dirname + '/stream_output.txt');
checker.loadStream(myReadStream,SEO_Check.e_OUTPUT.STREAM, myWriteStream);

checker.checkImg()
	.checkATag()
	.checkHead()
	.checkH1()
	.checkStrong()
	.checkRobotMeta().end();


//check 2, input: path string, output: path string
const checker2 = new SEO_Check({debug:false, maxStrongTagCnts: 4});
checker2.loadFilePath(__dirname + '/test.html',SEO_Check.e_OUTPUT.FILE, __dirname + '/path_output.txt');

checker2.checkImg()
	.checkATag()
	.checkHead()
	.checkH1()
	.checkStrong()
	.checkRobotMeta().end();

//check 3, input: path string, output: console
const checker3 = new SEO_Check({debug:false, maxStrongTagCnts: 4});
checker3.loadFilePath(__dirname + '/test.html',SEO_Check.e_OUTPUT.CONSOLE);

checker3.checkImg()
	.checkATag()
	.checkHead()
	.checkH1()
	.checkStrong()
	.checkRobotMeta().end();


