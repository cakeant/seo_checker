#install
``npm install seo_proj``

# usage

## load with file path
```
//include module
const SEO_Check = require('seo_proj');

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
[seo-check] checking result:( [filepath]/test_vpon.html )
[seo-check] h1: Failed, more than 1 <h1> found
[seo-check] strong tag check: Failed, too many <strong> tags (<=4)
[seo-check] img: Failed, 17 img tag(s) without alt attribute found
[seo-check] a tag: Failed, 23 a tag(s) without rel attribute found
[seo-check] title: Failed, no title tag found
[seo-check] description meta: Failed, no description meta found
[seo-check] keywords meta: Failed, no keywords meta found
*/
```
#options

| name             | description                   | type | default |
|------------------|-------------------------------|------|---------|
| debug            | is enable debug mode          | bool | false   |
| maxStrongTagCnts | max count for strong tag (<=) | int  | 15      |

#functions
##init
####SEO_Check
new with a constructor

	//include module
	const SEO_Check = require('seo_proj');
	
	//new instance
	const checker = new SEO_Check({maxStrongTagCnts:4});

##load
####loadFilePath

```
//include module
const SEO_Check = require('seo_proj');

//new instance
const checker = new SEO_Check({maxStrongTagCnts:4});

//load file with path & set check rule
checker.loadFilePath(__dirname + '/test.html')
	.checkH1()
	.checkStrong();
```
####loadStream

```
//include module
const fs = require('fs');
const SEO_Check = require('seo_proj');

//new instance
const checker = new SEO_Check({maxStrongTagCnts:4});
const myReadStream = fs.createReadStream(__dirname + '/test_vpon.html');

//load file with path & set check rule
checker.loadStream(myReadStream)
	.checkH1()
	.checkStrong();
```
##checkers
####checkStrong
check rule: Detect if there’re more than 15 ``<strong>`` tag in HTML,
you can modify the max by setting options ``maxStrongTagCnts``

	var checker = new SEO_Check({maxStrongTagCnts:4});

####checkImg
check rule: Detect if any ``<img />`` tag without alt attribute

####checkATag
Detect if any ``<a />`` tag without rel attribute

####checkHead
In ``<head>`` tag

1. Detect if header doesn’t have ``<title>`` tag
1. Detect if header doesn’t have ``<meta name="description" ... />`` tag
1. Detect if header doesn’t have ``<meta name="keywords" ... />`` tag

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
Detect if a HTML have more than one ``<H1>`` tag.