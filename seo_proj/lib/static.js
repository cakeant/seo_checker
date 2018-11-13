
exports.loadStream = function(stream) {
	this._url = stream;
	console.log("loadStream", this.name, stream );
}

exports.loadFilePath = function(url) {
	this._url = url;
	console.log("loadFilePath", this.name );
	this.loadStream(null,url);
}

exports.checkMaxStrongCnts = function(cnt) {
	console.log("checkMaxStrongCnts", this.name );
	let parse = parseInt(cnt);
	if( NaN == parse ){
		return defaultOptions.DEFAULT_MAX_STRONG_CNTS;
	}
	return parse;
}
