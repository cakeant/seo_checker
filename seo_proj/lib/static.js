
const check = require('check-types'),
    defaultOptions = require('./options').default,
    _ = {
		extend: require('lodash/assignIn'),
    	defaults: require('lodash/defaults'),
    },
    cheerio = require('cheerio'),
    colors = require('colors'),
	fs = require('fs'),
    st = require('./static');


const formatError = (...data) => {
	console.error("[seo-check]",...data);
}
const formatLog = (...data) => {
	console.log("[seo-check]",...data);
}

exports.loadStream = function(inputRStream) {
	// console.log("loadStream", this.name );

	//check stream
	if( false==isReadableStream(inputRStream) ){
		formatError("input is not a stream, for file path please use loadFile instead");
		return this;
	}

	if( inputRStream ){
		inputRStream.setEncoding("utf-8");
		this._url = inputRStream.path;
	}
	let chunks = [];
	let ins = this;
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
			resolve(inputRStream.path);
		});
		inputRStream.on("error", reject);
	})

	inputRStream.on('data', function(chunk){
		chunks.push(chunk);
	});
	return this;
}

exports.loadFilePath = function(url) {
	// console.log("loadFilePath", this.name );
	//check url, options
	if( false==check.nonEmptyString(url) ){
		formatError("please check url, input url:", url);
		return this;
	}
	return this.loadStream( fs.createReadStream(url) );
}

exports.checkMaxStrongCnts = function(cnt) {
	// console.log("checkMaxStrongCnts", this.name );
	let parse = parseInt(cnt);
	if( NaN == parse ){
		return defaultOptions.DEFAULT_MAX_STRONG_CNTS;
	}
	return parse;
}

const isReadableStream = function(obj){
	// return true;
	return obj &&
		obj instanceof fs.ReadStream &&
		typeof (obj._read === 'function') &&
		typeof (obj._readableState === 'object');
}

const checkStart = function($) {
	// console.log("this", this.name, this._path);
	//request succ
	if( this.options.debug ) formatLog("request succ");
	
	formatLog("-------------------------");
	formatLog("checking result:(",this.name,")");
	this.result = $;
}

exports.checkImg = function() {
	// console.log("checkImg",this.name);
	if( this._req ) this._req.then( 
		()=>{ _checkImg.call(this); }
	);
	return this;
}
exports.checkATag = function() {
	if( this._req ) this._req.then( 
		()=>{_checkATag.call(this) }
	);
	return this;
}
exports.checkHead = function() {
	if( this._req ) this._req.then( 
		()=>{_checkHead.call(this) }
	);
	return this;
}
exports.checkStrong = function() {
	if( this._req ) this._req.then( 
		()=>{_checkStrong.call(this)}
	);
	return this;
}
exports.checkH1 = function() {
	if( this._req ) this._req.then( 
		()=>{_checkH1 .call(this);}
	);
	return this;
}
const _checkImg = function() {
	$ = this.result;
	let tagList = $('img:not([alt])');
	if( this.options.debug ) formatLog("img w/o alt cnt:",tagList.length);

	( 0<tagList.length ) 
		? formatLog("img:", ("Failed, "+tagList.length+" img tag(s) without alt attribute found").red) 
		: formatLog("img:","OK".red);
}
const _checkATag = function() {
	$ = this.result;
	let tagList = $('a:not([rel])');
	if( this.options.debug ) formatLog("a w/o rel cnt:",tagList.length);

	( 0<tagList.length ) 
		? formatLog("a tag:",("Failed, "+tagList.length+" a tag(s) without rel attribute found").red) 
		: formatLog("a tag:","OK".red);
}

const _checkHead = function() {
	$ = this.result;
	let head = $("head");
	let tagList_tt = head.find("title");
	let tagList_meta = head.find('meta[name]');
	let cnt_des = 0;
	let cnt_kw = 0;
	// console.log(head);
	tagList_meta.each( function( index, elem ) {
		let val = $(elem).attr("name");
		if( val ){
			val = val.toLowerCase();
			switch( val ){
				case "description":
					cnt_des++;
					break;
				case "keywords":
					cnt_kw++;
					break;
			}
		}
	})
	if( this.options.debug ) {
		formatLog("title cnt:",tagList_tt.length);
		formatLog("des cnt:",cnt_des);
		formatLog("kw cnt:",cnt_kw);
	}

	//check title
	( 0==tagList_tt.length ) 
		? formatLog("title:","Failed, no title tag found".red) 
		: formatLog("title:","OK".red);

	//check meta descriptions
	( 0==cnt_des )
		? formatLog("descriptions meta:","Failed, no description meta found".red)
		: formatLog("descriptions meta:","OK".red);
	
	//check meta keywords
	( 0==cnt_kw )
		? formatLog("keywords meta:","Failed, no keywords meta found".red)
		: formatLog("keywords meta:","OK".red);
	
}

const _checkStrong = function() {
	$ = this.result;
	//request succ
	let tagList_st = $('strong');
	if( this.options.debug ) formatLog("st cnt:",tagList_st.length);

	//check body for <strong> cnts <= options.maxStrongCnts
	( tagList_st.length > this.options.maxStrongCnts )
		? formatLog("strong tag check:","Failed, too many <strong> tags (<=",this.options.maxStrongCnts,")".red)
		: formatLog("strong tag check:","OK".red);
}

const _checkH1 = function() {
	$ = this.result;
	//request succ
	let tagList_h1 = $('h1');
	if( this.options.debug ) formatLog("h1 cnt:",tagList_h1.length);

	//check h1
	( 1<tagList_h1.length )
		? formatLog("h1:","Failed, more than 1 <h1> found".red)
		: formatLog("h1:","OK".red);
}