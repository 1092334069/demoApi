function parsePathName(req) {
	if (req && req._parsedUrl) {
		return req._parsedUrl.pathname
	} else {
		return ''
	}
}

function parseParam(req) {
	let param = {}
	if (req) {
		if (req.method === 'POST') {
			param = req.body
		} else {
			param = req.query
		}
	}
	return param
}

module.exports = {
	parsePathName,
	parseParam
}