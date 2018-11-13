
const defaultOptions = require('./options').default,
    _ = {
		extend: require('lodash/assignIn'),
    	defaults: require('lodash/defaults'),
    };
let cnt = 1;

var SEO_Check = module.exports = class SEO_Check{
	constructor(options) {
		this.name = "SEO_Check_"+cnt;
		cnt++;
		this.options = _.defaults((options || {}), defaultOptions);

		this.options.maxStrongTagCnts = this.checkMaxStrongCnts( this.options.maxStrongTagCnts );

		console.log("constructor", this.name );
		this._queue = [];
		this._processing = false;
	}
}

_.extend(SEO_Check.prototype, require('./static'));


