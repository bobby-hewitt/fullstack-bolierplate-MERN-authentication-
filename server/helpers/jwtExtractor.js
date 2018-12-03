module.exports = function(req){
	return req.headers.jwt ? req.headers.jwt.toString() : ''
}