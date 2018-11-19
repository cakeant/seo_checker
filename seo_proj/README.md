SEO_Checker
============

** dependency **

* npm: 5.6.0
* node: v8.11.1

** warning **

If you are looking for a general SEO checker, this might not be what you are looking for for now.

(Just a small homework project with predefined rules listed [below](#user-content-api-table), will upgrade after the check, 

You can still achieve a general SEO checker by registering your own function like og tag tester, etc. Please check [register customize check API](#user-content-register-customize-check-api) for detail. )

##description
a simple tool to scan file/stream for defacts

* support input: ReadStream / file path
* support output: WriteStream / file path / log
* easy to register customize SEO check rules

##installation
``npm install @glorialin/seo_checker``

## usage

### load with file path

```
//include module
const SEO_Check = require('@glorialin/seo_checker');

//register new SEO rule
SEO_Check.registerRule("checkRobotMeta",function() {
	$ = this.result;
	//request succ
	let tagList = $('meta[name="robots"]');
	if( this.options.debug ) this.formatLog("robot cnt:",tagList.length);

	//check robot
	( 0==tagList.length )
		? this.formatLog("robot meta:","Failed, no robot meta found")
		: this.formatLog("robot meta:","OK");
});

//new instance
var checker = new SEO_Check({maxStrongTagCnts:4});

//load file with path & set check rule
checker.loadFilePath(__dirname + '/test.html')
	.checkH1()
	.checkStrong();
```

#output
example passed log:

```
[seo-check] -------------------------
[seo-check] checking result:( [filepath]/test.html )
[seo-check] h1: OK
[seo-check] strong tag check: OK
[seo-check] img: OK
[seo-check] a tag: OK
[seo-check] title: OK
[seo-check] descriptions meta: OK
[seo-check] keywords meta: OK
```
example error log:

```
[seo-check] -------------------------
[seo-check] checking result:( [filepath]/test.html )
[seo-check] h1: Failed, more than 1 <h1> found
[seo-check] strong tag check: Failed, too many <strong> tags (<=4)
[seo-check] img: Failed, 17 img tag(s) without alt attribute found
[seo-check] a tag: Failed, 23 a tag(s) without rel attribute found
[seo-check] title: Failed, no title tag found
[seo-check] description meta: Failed, no description meta found
[seo-check] keywords meta: Failed, no keywords meta found
```
#options

| name             | description                   | type | default |
|------------------|-------------------------------|------|---------|
| debug            | is enable debug mode          | bool | false   |
| maxStrongTagCnts | max count for strong tag (<=) | int  | 15      |

#API table

table of contents

* [init](#init)
	* [SEO_Check](#seo_check)
* [enum](#enum)
	* [e_OUTPUT](#e_output)
* [load](#load)
	* [loadFilePath](#loadfilepath)
	* [loadStream](#loadstream)
* [check APIs](#user-content-check-apis)
	* [checkStrong](#checkstrong)
	* [checkImg](#checkimg)
	* [checkATag](#checkatag)
	* [checkHead](#checkhead)
	* [checkH1](#checkh1)
	* [end](#end)
* [register customize check API](#user-content-register-customize-check-api)
	* [registerRule](#registerrule)
	* [formatLog](#formatlog)
	* [formatLogWithTitle](#formatlogwithtitle)


# API
##init
####SEO_Check
new with a constructor

	//include module
	const SEO_Check = require('@glorialin/seo_checker');
	
	//new instance
	const checker = new SEO_Check({maxStrongTagCnts:4});

## enum
####e_OUTPUT

output option

* FILE: use a file path for output
* STREAM: use a WriteStream for output
* CONSOLE: use console for output

##load
####loadFilePath

#####parameter

| name         | description                                                                                                                              | type                         | default                                                                                                                                                                  |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| inputPath    | path of input file                                                                                                                       | string                       | no, will not load if invalid                                                                                                                                             |
| eOutputVal   | enum option for output                                                                                                                   | SEO\_Check.e\_OUTPUT (integer) | SEO\_Check.e\_OUTPUT.CONSOLE                                                                                                                                               |
| pathOrStream | output destination input should be path string when eOutputVal==eOutputVal.FILE  should be WriteStreamwhen eOutputVal==eOutputVal.STREAM | string/WriteStream           | no, will output to output_[time].txt when path is invalid for eOutputVal==eOutputVal.FILE  will output to console when path is invalid for eOutputVal==eOutputVal.STREAM |

#####usage

```
//include module
const SEO_Check = require('@glorialin/seo_checker');

//new instance
const checker = new SEO_Check({maxStrongTagCnts:4});

//load file with path & set check rule
checker.loadFilePath(
	__dirname + '/test.html',
	eOutputVal==eOutputVal.FILE,
	__dirname + '/result.txt'
).checkH1()
	.checkStrong();
```
####loadStream


| name         | description                                                                                                                              | type                         | default                                                                                                                                                                  |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| inputRStream | input readable stream                                                                                                                    | ReadStream                   | no, will not load if invalid                                                                                                                                    |
| eOutputVal   | enum option for output                                                                                                                   | SEO\_Check.e\_OUTPUT (integer) | SEO\_Check.e\_OUTPUT.CONSOLE                                                                                                                                               |
| pathOrStream | output destination input should be path string when eOutputVal==eOutputVal.FILE / should be WriteStreamwhen eOutputVal==eOutputVal.STREAM | string/WriteStream           | no, will output to output_[time].txt when path is invalid for eOutputVal==eOutputVal.FILE / will output to console when path is invalid for eOutputVal==eOutputVal.STREAM |

#####usage

```
//include module
const fs = require('fs');
const SEO_Check = require('@glorialin/seo_checker');

//new instance
const checker = new SEO_Check({maxStrongTagCnts:4});
const myReadStream = fs.createReadStream(__dirname + '/test.html');
const myWriteStream = fs.createWriteStream(__dirname + '/result.txt');

//load file with path & set check rule
checker.loadStream(myReadStream,
	eOutputVal==eOutputVal.STREAM,
	myWriteStream
).checkH1()
	.checkStrong();
```
##check APIs
####checkStrong

##### usage
check rule: Detect if there’re more than 15 ``<strong>`` tag in HTML,
you can modify the max by setting options ``maxStrongTagCnts``

	var checker = new SEO_Check({maxStrongTagCnts:4});

```
checker.loadFilePath(__dirname + '/test.html'). checkStrong();
```


####checkImg

##### usage
check rule: Detect if any ``<img />`` tag without alt attribute

```
checker.loadFilePath(__dirname + '/test.html').checkImg();
```

####checkATag

##### usage
Detect if any ``<a />`` tag without rel attribute

```
checker.loadFilePath(__dirname + '/test.html').checkATag();
```

####checkHead

##### usage
In ``<head>`` tag

1. Detect if header doesn’t have ``<title>`` tag
1. Detect if header doesn’t have ``<meta name="description" ... />`` tag
1. Detect if header doesn’t have ``<meta name="keywords" ... />`` tag

```
checker.loadFilePath(__dirname + '/test.html').checkHead();
```

<style>
.strong{color:red;font-weight:bolder;}
</style>
<h4 class="strong">** NOTE ** </h4>
<p class="strong">
the SEO rule for description in the assignment is slightly different from general rule:
The "Pre-defined SEO rules" for description tag is
</p>

    <meta name="descriptions"/> (with s)
<p class="strong">
the general rule is "description"(w/o s) instead.
</br>
Reference: https://moz.com/learn/seo/meta-description 
</p>

####checkH1

##### usage
Detect if a HTML have more than one ``<H1>`` tag.

```
checker.loadFilePath(__dirname + '/test.html').checkH1();
```

####end

| name         | description                                                                                                                              | type                         | default                                                                                                                                                                  |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| callback | a callback function called on end calling end()                                                                                                                    | function                   | no, will not been called if invalid                                                                                                                                    |

##### usage
use to close WriteStream of output

```
checker.loadFilePath(__dirname + '/test.html').end(function(){
	console.log("on end");
});
```
if any check rule apply after end(), the output will be switch to console automatically


```
checker.loadFilePath(__dirname + '/test.html', SEO_Check.e_OUTPUT.FILE)
	.checkH1()
	.checkStrong().end( ()=>{console.log("on end");} )
	.checkATag();

/*console output
(a tag check auto switch to log
since the file has been closed)
-------------------------
checking result: /Library/WebServer/Documents/projects/201811_sb_hw/test_proj/test.html
output to: output_1542256178825.txt
file end exported
on end
a tag:             Failed, 121 a tag(s) without rel attribute found
*/

/*output_[time].txt output
h1:                OK 
strong tag:        OK 
*/
```

##register customize check API
#### SEO_Check.registerRule

#####parameters
| name     | description                            | type   | default                                          |
|----------|----------------------------------------|--------|--------------------------------------------------|
| name     | rule API name                          | string | no, will reject registration if name invalid     |
| callback | a callback on loading promise resolved | int    | no, will reject registration if callback invalid |

#####usage
a static API to register a global check rule

to register

```
SEO_Check.registerRule("checkRobotMeta",function() {
	//get h5 parser result of input
	//this will be SEO_Check instance
	$ = this.result;
	
	//your rule here
	let tagList = $('meta[name="robots"]');
	if( this.options.debug ) this.formatLog("robot cnt:",tagList.length);

	//user instance.formatLog to output msg to console/stream
	this.formatLog("robot rule is working!");
	
	//user instance.formatLogWithTitle to output msg to console/stream with title indentation
	( 0==tagList.length )
		? this.formatLogWithTitle("robot meta:","Failed, no robot meta found")
		: this.formatLogWithTitle("robot meta:","OK");
});
```

to use

```
//new instance
const checker = new SEO_Check({debug:false, maxStrongTagCnts: 18});

//load with readable stream
const myReadStream = fs.createReadStream(__dirname + '/test.html');
checker.loadStream(myReadStream,SEO_Check.e_OUTPUT.LOG);

//apply rule checkRobotMeta
checker.checkImg()
	.checkATag()
	.checkHead()
	.checkH1()
	.checkStrong()
	.checkRobotMeta().end();

/*output:
-------------------------
checking result: /Library/WebServer/Documents/projects/201811_sb_hw/test_proj/test.html
a tag:             Failed, 23 a tag(s) without rel attribute found
title:             OK
description meta:  OK
keywords meta:     OK
h1:                OK
strong tag:        OK
robot rule is working!
robot meta:        Failed, no robot meta found
*/
```

#### formatLog

#####parameters
| name    | description                            | type   | default                               |
|---------|----------------------------------------|--------|---------------------------------------|
| ...data | strings to be output, joined with space             | string (or can be transform to string) | no, will output an empty line if invalid      |

#####usage

the log will be output to either console or file, depends on your SEO\_Check.e\_OUTPUT in this instance

```
checker.formatLog("test",2,3);
checker.formatLog("test2",2,3);
/*output:
test 2 3
test2 2 3
*/
```

#### formatLogWithTitle

#####parameters
| name    | description                            | type   | default                               |
|---------|----------------------------------------|--------|---------------------------------------|
| title   | title to be formatted with indentation | string (or can be transform to string) | no, will not be indented if not valid |
| ...data | other strings to be output to log or file, joined with space             | string (or can be transform to string) | no, will be passed to formatLog     |

#####usage

the log will be output to either console or file, depends on your SEO\_Check.e\_OUTPUT in this instance

```
checker.formatLogWithTitle("test",2,3);
checker.formatLogWithTitle("test2",2,3);
/*output:
test               2 3
test2              2 3
*/
```
