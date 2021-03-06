var qs = require('querystring')
var extend = require('extend')
var util = require('util')

var Model = require('./')

function Metadats (defaults) {
  Model.call(this, defaults)
}

util.inherits(Metadats, Model)

Metadats.prototype.update = function (id, metadat, opts, cb) {
  // requires login + ownership
  if (typeof opts === 'function') return this.update(id, metadat, {}, opts)

  var options = extend({
    uri: '/api/metadat/' + id,
    method: 'PUT',
    json: metadat
  }, opts)

  this.request(options, cb)
}

Metadats.prototype.publish = function (metadat, opts, cb) {
  // requires login
  if (typeof opts === 'function') return this.publish(metadat, {}, opts)

  var options = extend({
    uri: '/api/metadat',
    method: 'POST',
    json: metadat
  }, opts)

  this.request(options, function (err, resp, json) {
    if (err) return cb(err)
    metadat.id = json.id
    return cb(null, resp, metadat)
  })
}

Metadats.prototype.query = function (params, cb) {
  // Parameters
  // params: dict
  //  keys represent the fields to filter upon
  if (!params) {
    return cb(new Error('Give at least one param or use the `all` function.'))
  }
  var options = {
    uri: '/api/metadat?' + qs.stringify(params),
    method: 'GET',
    json: true
  }
  this.request(options, cb)
}

Metadats.prototype.all = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  var options = extend({
    uri: '/api/metadat',
    method: 'GET',
    json: true
  }, opts)
  this.request(options, cb)
}

Metadats.prototype.getById = function (metadatId, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  console.log('getting by id', metadatId)
  var options = extend({
    uri: '/api/metadat/' + metadatId,
    method: 'GET',
    json: true
  }, opts)

  this.request(options, function (err, resp, json) {
    if (err) {
      return cb(new Error('Could not get that dat, are you sure the ID is right?'))
    }
    return cb(null, resp, json)
  })
}

module.exports = Metadats
