
const defaultOptions = require('./options').default,
    _ = {
		extend: require('lodash/assignIn'),
    	defaults: require('lodash/defaults'),
    },
	fs = require('fs'),
	check = require('check-types');

var SEO_Check = module.exports = class SEO_Check{
	constructor(options) {
		this.name = "SEO_Check";
		this.options = _.defaults((options || {}), defaultOptions);

		this.options.maxStrongTagCnts = this.checkMaxStrongCnts( this.options.maxStrongTagCnts );

		console.log("constructor", this.name );
	}
}

_.extend(SEO_Check.prototype, require('./static'));


