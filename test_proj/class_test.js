const fs = require('fs');
const SEO_Check = require('seo_checker');

//load with readable stream, write to path
const checker = new SEO_Check({debug:false, maxStrongTagCnts: 4});
const myReadStream = fs.createReadStream(__dirname + '/test_vpon.html');
const myWriteStream = fs.createWriteStream(__dirname + '/pos_output.txt');
checker.loadStream(myReadStream,SEO_Check.e_OUTPUT.STREAM, myWriteStream);
// checker.formatLog();
// checker.formatLog("test2",2,3);
// checker.formatLogWithTitle();
// checker.formatLogWithTitle("test2",2,3);
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

checker.checkImg()
	.checkATag()
	.checkHead()
	.checkH1()
	.checkStrong()
	.checkRobotMeta().end();


//load with a file path
// var checker2 = new SEO_Check({maxStrongTagCnts:4});
// checker2.loadFilePath(__dirname + '/test_vpon.html', SEO_Check.e_OUTPUT.FILE)
// 	.checkH1()
// 	.checkStrong().end()
// 	.checkATag();


//load with a file path, write to a stream
// var checker3 = new SEO_Check();
// const myWriteStream = fs.createWriteStream(__dirname + '/test_vpon_check.txt');
// checker3.loadFilePath(__dirname + '/test.html', SEO_Check.e_OUTPUT.STREAM, myWriteStream)
// 	.checkATag()
// 	.checkHead()
// 	.checkH1()
// 	.checkStrong()
// 	.checkRobotMeta().end(); //call end to close file