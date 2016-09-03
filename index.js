'use strict'

var fs = require('fs')
var mkdirp = require('mkdirp')
var path = require('path')

var app = require('express')()
app.enable('trust proxy')
var server = require('http').createServer(app)

var uploadFolder = process.env.uploadFolder || '/uploads'

app.use(require('compression')())
app.use(require('body-parser').raw({type: '*/*', limit: process.env.MAXSIZE}))
app.use(require('method-override')())
app.put('/:path*', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'PUT, OPTIONS')
  res.set('Access-Control-Allow-Headers', 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type')

  var to = uploadFolder + (req.get('upload-folder') || '') + req.path
  mkdirp(path.parse(to).dir, function (err) {
    if (err) {
      return res.status(500).json({error: 'error saving'})
    }
    var stream = fs.createWriteStream(to)
    stream.write(req.body)
    stream.on('drain', function () {
      res.status(200).json({ok: true})
    })
    stream.on('error', function (algo) {
      console.log(algo)
      res.status(500).json({error: 'error saving'})
    })
  })
})

server.listen(process.env.PORT, process.env.IP, function () {
  console.log('Express server listening in %s:%s mode. Max file size allowed %s\n', process.env.IP, process.env.PORT, process.env.MAXSIZE)
})
