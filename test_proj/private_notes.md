#npm package
## [pkg] 1st publish
1. create a user on npm
	
	npm adduser
1. login

	npm login
1. publish

	npm publish
	
1. check package

	https://www.npmjs.com/settings/glorialin/packages
	
## [client] install
npm install [pkg-name]

## [pkg] update publish
1. update version
2. npm publish

## [client] update
npm update


#module debug
npm link

https://blog.csdn.net/u014291497/article/details/75194456

=============
working logs
* no lower case option for attrib data, so select meta[name="description"] will pass meta[name="Description"]
	* trace: cheerio > htmlparser2: Parser.js Parser.prototype.onattribdata

#testing
https://glebbahmutov.com/blog/debugging-mocha-using-inspector/

"test": "mocha --inspect-brk test/inte_1.js"
chrome://inspect/#devices