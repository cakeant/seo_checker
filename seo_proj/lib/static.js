
const check = require('check-types'),
    defaultOptions = require('./options').default,
    _ = {
		extend: require('lodash/assignIn'),
    	defaults: require('lodash/defaults'),
    },
    cheerio = require('cheerio'),
    // colors = require('colors'),
	fs = require('fs'),
    st = require('./static'),
    SEO_Check = require('./seo_check');


exports.loadStream = function(inputRStream, eOutputVal, pathOrStream) {
	// console.log(eOutputVal, pathOrStream);
	switch( eOutputVal ){
		case SEO_Check.e_OUTPUT.FILE:
			this._outputOpt = eOutputVal;
			if( check.nonEmptyString(pathOrStream) ){
				this._outputStream = fs.createWriteStream(pathOrStream);
			} else {
				SEO_Check.formatError("path is null or empty, write to output_[time].txt");
				this._outputStream = fs.createWriteStream('output_'+(new Date()).getTime()+'.txt');
			}
			break;
		case SEO_Check.e_OUTPUT.STREAM:
			if( isWritableStream(pathOrStream) ){	
				this._outputOpt = eOutputVal;
				this._outputStream = pathOrStream;
			} else {
				SEO_Check.formatError("input is not a stream, switch to console mode.");
				this._outputOpt = SEO_Check.e_OUTPUT.CONSOLE;
				this._outputStream = null;
			}
			break;
		case SEO_Check.e_OUTPUT.CONSOLE:
		default:
			this._outputOpt = SEO_Check.e_OUTPUT.CONSOLE;
			this._outputStream = null;
			break;
	}
	// console.log("loadStream", this.name );

	//check stream
	if( false==isReadableStream(inputRStream) ){
		SEO_Check.formatError("input is not a stream, for file path please use loadFile instead");
		return this;
	}

	if( inputRStream ){
		inputRStream.setEncoding("utf-8");
		this._url = inputRStream.path;
	}
	let chunks = [];
	let ins = this;

	if( ins._outputStream ){
		this._req = new Promise(function(resolve, reject) {
			// resolve with location of saved file
			ins._outputStream.on("close", ()=>{
				resolve(inputRStream.path);
			});
			inputRStream.on("error", reject);
		})
		inputRStream.on("end", ()=>{
			let data = chunks.join();
			let str = data.toString();
			// console.log( "loadStream", str );
			checkStart.call(ins, 
				cheerio.load(str, {
					lowerCaseTags: true,
					lowerCaseAttributeNames:true,
					xmlMode:false,
					_useHtmlParser2:true
				})
			);
			for( item of ins._queue ){
				item.call(ins);
			}
		});
	} else {
		this._req = new Promise(function(resolve, reject) {
			// resolve with location of saved file
			inputRStream.on("end", ()=>{
				// console.log('There will be no more data.');
				
				let data = chunks.join();
				let str = data.toString();

				// console.log( "loadStream", str );
				checkStart.call(ins, 
					cheerio.load(str, {
						lowerCaseTags: true,
						lowerCaseAttributeNames:true,
						xmlMode:false,
						_useHtmlParser2:true
					})
				);
				for( item of ins._queue ){
					item.call(ins);
				}
				resolve(inputRStream.path);
			});
			inputRStream.on("error", reject);
		})
	}

	inputRStream.on('data', function(chunk){
		chunks.push(chunk);
	});
	return this;
}

exports.loadFilePath = function(url, ...data) {
	// console.log("loadFilePath", this.name );
	//check url, options
	if( false==check.nonEmptyString(url) ){
		SEO_Check.formatError("please check url, input url:", url);
		return this;
	}
	return this.loadStream( fs.createReadStream(url),...data );
}

exports.checkMaxStrongCnts = function(cnt) {
	// console.log("checkMaxStrongCnts", this.name );
	let parse = parseInt(cnt);
	if( isNaN(parse) ){
		return defaultOptions.DEFAULT_MAX_STRONG_CNTS;
	}
	return (parse<0)? 1:parse;
}

exports.formatLogWithTitle = function(title,...data) {
	if( check.nonEmptyString(title) ){
		var times = Math.max(18-title.length,0);
		for(let i=0;i<times;i++) title+=' ';
	}
	this.formatLog(title,...data);
}

exports.formatLog = function(...data) {
	if( null==data ) data = [];
	if( this._outputStream ) {
		data.push('\r\n');
		this._outputStream.write( (data.join(" ")),'UTF8');
	} else {
		console.log(...data);
	}
}

exports.end = function(){
	if( this._queue ) this._queue.push( () => {
		(()=>{
			if( this._outputStream ) {
				this._outputStream.end();
				this._outputStream = null;
				console.log("file end exported");
			}
		}).call(this);
	});
	// if( this._req ) this._req.then( () => {
	// 	(()=>{
	// 		if( this._outputStream ) {
	// 			this._outputStream.end();
	// 			this._outputStream = null;
	// 			console.log("file end exported");
	// 			callback();
	// 		}
	// 	}).call(this);
	// });
	return this;
}

const isReadableStream = function(obj){
	// return true;
	return obj &&
		obj instanceof fs.ReadStream &&
		typeof (obj._read === 'function') &&
		typeof (obj._readableState === 'object');
}
const isWritableStream = function(obj){
	// return true;
	return obj &&
		obj instanceof fs.WriteStream &&
		typeof (obj._write === 'function') &&
		typeof (obj._writableState === 'object') &&
		true==obj.writable;
}

const checkStart = function($) {
	// console.log("this", this.name, this._url);
	//request succ
	if( this.options.debug ) this.formatLog("request succ");
	
	console.log("-------------------------");
	console.log("checking result:",this._url);
	if(null!=this._outputStream) console.log("output to:",this._outputStream.path);
	this.result = $;
}
