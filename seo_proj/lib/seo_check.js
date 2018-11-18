
const defaultOptions = require('./options').default,
	check = require('check-types'),
	_ = {
		extend: require('lodash/assignIn'),
		defaults: require('lodash/defaults'),
	};

var SEO_Check = module.exports = class SEO_Check{
	constructor(options) {
		this.options = _.defaults((options || {}), defaultOptions);

		this.options.maxStrongTagCnts = this.checkMaxStrongCnts( this.options.maxStrongTagCnts );

		if(this.options.debug) console.log(options);
		this._queue = [];
		this._processing = false;
		this.registerDefaultRules();
	}

	static registerRule(name,callback){
		if( this.hasOwnProperty(name) ) {
			this.formatError("[Error] name already taken");
			return false;
		}

		if( false==check.function(callback) ){
			this.formatError("[Error] callback is not a function");
			return false;
		}

		// console.log("registerRule", name, callback.name);
		this.prototype[name] = function() {
			// if( this._req ) this._req.then( 
			// 	()=>{ callback.call(this); }
			// );
			if( this._queue ) this._queue.push( callback );
			return this;
		}
	}
	static get e_OUTPUT() {
		return {
			FILE: 0,
			STREAM: 1,
			CONSOLE: 2
		};
	}

	static formatError(...data) {
		// if( this._outputStream ) {
		// 	data.push('\r\n');
		// 	this._outputStream.write(data.join(" "),'UTF8');
		// } else {
			console.error(...data);
		// }
	}

	async getPromise(){
		return this._req;
	}

	static streamPromise(stream) {
		return new Promise((resolve, reject) => {
			stream.on('end', () => {
				resolve('end');
			});
			stream.on('finish', () => {
				resolve('finish');
			});
			stream.on('error', (error) => {
				reject(error);
			});
		});
	}
}

_.extend(SEO_Check.prototype, require('./static'));
_.extend(SEO_Check.prototype, require('./rules'));


