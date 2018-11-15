#structure

```
├───README.md 				//readme for contributers
├───seo_proj 				//module
│   ├───README.md 			//readme for the file
│   ├───index.js 			//enter point of module
│   ├───lib 				//module body
│   	├───seo_checker.js 	//checker class definition
│   	├───static.js 		//loading functions, some tool functions definition
│   	├───rules.js 		//default rules here
│   	├───options.js 		//option & defaults
│   ├───test 				//testing files
│   	├───inte.js 		//a simple integration testing...TODO listed
│   	├───pos.html 		//sample positive input, should check OK
│   	├───neg.html 		//sample positive input, should check fail
│   	├───options.js 		//option & defaults
├───install_test_proj 		//test published module
│   ├───index.js 			//sample usage, for POC the module
│   ├───test.html 			//a sample input file
├───test_proj 				//test playground, use for link test
    ├───files 				//just some testing files...
```

#debug module

in this project
``npm link``

in testing project
``npm link seo_checker``

#test module

``npm test``

#test module with chrome

[tutorial with img](https://glebbahmutov.com/blog/debugging-mocha-using-inspector/)

1. modify package.json

	```
	"scripts": {
	    "test": "mocha"
	  }
	```
	to
	
	```
	"scripts": {
	    "test": "mocha --inspect-brk test/inte_1.js"
	  }
	```
2. ``npm test``
3. open link [chrome://inspect/#devices](chrome://inspect/#devices)
4. click inspect in remote target area, then you can start debugging