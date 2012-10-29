var _ = require("underscore");
/*
 * GET home page.
 */

exports.index = function(req, res){

	console.log("!!",req.session);
	req.session.test = !_.isUndefined(req.session.test) ? req.session.test+1 : -5;

  res.render('index', { title: req.session.test });
};