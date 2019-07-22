const express = require('express')
const http = require('http')
const path = require('path')
const fs = require('fs')
const bodyParser = require("body-parser")
const querystring = require('querystring')
const multiparty = require('multiparty')

const httpUtil = require('./libs/httpUtil')

const app = express()

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS')
    res.header('X-Powered-By', 'nodejs')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})

app.use(bodyParser.urlencoded({ extended: false }))

var server = app.listen(9091, function () {
	console.log('listen 9091')
})

function requestAction(req, res) {
	const pathname = httpUtil.parsePathName(req)
	const param = httpUtil.parseParam(req)
	try {
		const file = path.join(__dirname, `${pathname}.json`)
		fs.readFile(file, 'utf-8', function(err, data) {
			if (err) {
				res.json({
					"code": 404,
					"message": '读取接口失败'
				})
			} else {
				res.send(data)
			}
		})
	} catch(e) {
		res.json({
			"code": 500,
			"message": '找不到路径'
		})
	}
}

app.get('*', requestAction)

app.post('*', requestAction)