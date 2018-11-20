
const SEO_Check = require('./seo_check');
exports.registerDefaultRules = function(){
	SEO_Check.registerRule("checkImg",checkImg);
	SEO_Check.registerRule("checkATag",checkATag);
	SEO_Check.registerRule("checkHead",checkHead);
	SEO_Check.registerRule("checkStrong",checkStrong);
	SEO_Check.registerRule("checkH1",checkH1);
	SEO_Check.registerRule("checkOGTag",checkOGTag);
}

const checkImg = function() {
	$ = this.result;
	let tagList = $('img:not([alt])');
	if( this.options.debug ) this.formatLog("img w/o alt cnt:",tagList.length);

	if( 0<tagList.length ) {
		this.formatLogWithTitle("img:", ("Failed, "+tagList.length+" img tag(s) without alt attribute found")) 
		return tagList.length;
	} else {
		this.formatLogWithTitle("img:","OK");
		return 0;
	}
}

const checkHead = function() {
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
		this.formatLog("title cnt:",tagList_tt.length);
		this.formatLog("des cnt:",cnt_des);
		this.formatLog("kw cnt:",cnt_kw);
	}

	//check title
	( 0==tagList_tt.length ) 
		? this.formatLogWithTitle("title:","Failed, no title tag found") 
		: this.formatLogWithTitle("title:","OK");

	//check meta descriptions
	( 0==cnt_des )
		? this.formatLogWithTitle("description meta:","Failed, no description meta found")
		: this.formatLogWithTitle("description meta:","OK");
	
	//check meta keywords
	( 0==cnt_kw )
		? this.formatLogWithTitle("keywords meta:","Failed, no keywords meta found")
		: this.formatLogWithTitle("keywords meta:","OK");
	
}

const checkATag = function() {
	$ = this.result;
	let tagList = $('a:not([rel])');
	if( this.options.debug ) this.formatLog("a w/o rel cnt:",tagList.length);

	if( 0<tagList.length ) {
		this.formatLogWithTitle("a tag:",("Failed, "+tagList.length+" a tag(s) without rel attribute found")) 
		return true;
	} else {
		this.formatLogWithTitle("a tag:","OK");
		return false;
	}
}

const checkStrong = function() {
	$ = this.result;
	//request succ
	let tagList_st = $('strong');
	if( this.options.debug ){
		this.formatLogWithTitle("st cnt:",tagList_st.length);
		this.formatLogWithTitle("max st cnt:",this.options.maxStrongTagCnts);
	}

	//check body for <strong> cnts <= options.maxStrongTagCnts
	( tagList_st.length > this.options.maxStrongTagCnts )
		? this.formatLogWithTitle("strong tag:",("Failed, too many <strong> tags (<="+this.options.maxStrongTagCnts+")"))
		: this.formatLogWithTitle("strong tag:","OK");
}

const checkH1 = function() {
	$ = this.result;
	//request succ
	let tagList_h1 = $('h1');
	if( this.options.debug ) this.formatLogWithTitle("h1 cnt:",tagList_h1.length);

	//check h1
	( 1<tagList_h1.length )
		? this.formatLogWithTitle("h1:","Failed, more than 1 <h1> found")
		: this.formatLogWithTitle("h1:","OK");
}


const checkOGTag = function() {
	$ = this.result;
	let head = $("head");
	let tagList_meta = head.find('meta[property]');
	let cnt_url = 0;
	let cnt_title = 0;
	let cnt_img = 0;
	// console.log(head);
	tagList_meta.each( function( index, elem ) {
		let val = $(elem).attr("property");
		if( val ){
			val = val.toLowerCase();
			switch( val ){
				case "og:url":
					cnt_url++;
					break;
				case "og:title":
					cnt_title++;
					break;
				case "og:image":
					cnt_img++;
					break;
			}
		}
	})
	if( this.options.debug ) {
		this.formatLog("og:url meta:",cnt_url);
		this.formatLog("og:title meta:",cnt_title);
		this.formatLog("og:image meta:",cnt_img);
	}

	//check title
	( 0==cnt_url ) 
		? this.formatLogWithTitle("og:url","Failed, no og:url meta found") 
		: this.formatLogWithTitle("og:url","OK");

	//check meta descriptions
	( 0==cnt_title )
		? this.formatLogWithTitle("og:title","Failed, no og:title meta found")
		: this.formatLogWithTitle("og:title","OK");
	
	//check meta keywords
	( 0==cnt_img )
		? this.formatLogWithTitle("og:image","Failed, no og:image meta found")
		: this.formatLogWithTitle("og:image","OK");
	
}