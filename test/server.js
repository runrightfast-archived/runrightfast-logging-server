/**
 * Copyright [2013] [runrightfast.co]
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

'use strict';

var expect = require('chai').expect;

var Hapi = require('hapi');
var serverConfig = require('../config');
var http = require('http');
var config = require('config');

var logApiOptions = {
	hostname : 'localhost',
	port : config.hapiServer.port,
	path : '/api/runrightfast-logging-service/log',
	method : 'POST'
};

function postEvents(events, callback, errorCallback) {
	var req = http.request(logApiOptions, callback);

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
		if (errorCallback) {
			errorCallback();
		}
	});

	// write data to request body
	req.write(JSON.stringify(events));
	req.end();
}

function startServer(callback) {
	var Hapi = require('hapi');

	var composer = new Hapi.Composer(serverConfig.manifest);

	composer.compose(function(err) {
		if (err) {
			console.error('Failed composing servers : ' + err.message);
			callback(err);
		} else {
			console.log('Hapi is composed.');
			composer.start(function() {
				console.log('All servers started');
				callback();
			});
		}
	});

	return composer;
}

describe('Logging Server', function() {

	it('is composed', function(done) {
		var composer = new Hapi.Composer(serverConfig.manifest);

		composer.compose(function(err) {

			if (err) {
				console.log('Failed composing');
				done(err);
			}

			done();
		});
	});

	describe('testing running HTTP server - via http module', function() {
		var composer = null;

		before(function(done) {
			composer = startServer(done);
		});

		after(function(done) {
			composer.stop({
				timeout : 1000
			}, function() {
				console.log('All servers stopped');
				done();
			});
		});

		it(' POST a single valid event', function(done) {
			var event = {
				tags : [ 'info' ],
				data : 'test : POST a single valid event'
			};

			postEvents(event, function(response) {
				if (response.statusCode === 202) {
					done();
				} else {
					done(new Error('Expected response.statusCode = 202, but actually was : ' + response.status.code));
				}
			}, done);

		});

		it('POST an array of valid events', function(done) {
			var events = [ {
				tags : [ 'info' ],
				data : 'test : POST a single valid event - 1'
			}, {
				tags : [ 'info' ],
				data : 'test : POST a single valid event - 2'
			}, {
				tags : [ 'info' ],
				data : 'test : POST a single valid event - 3'
			}, {
				tags : [ 'info' ],
				data : 'test : POST a single valid event - 4'
			} ];

			postEvents(events, function(response) {
				if (response.statusCode === 202) {
					done();
				} else {
					done(new Error('Expected response.statusCode = 202, but actually was : ' + response.status.code));
				}
			}, done);

		});

	});

	describe('testing running HTTP server - via rest module', function() {
		var rest = require('rest');
		var composer = null;

		before(function(done) {
			composer = startServer(done);
		});

		after(function(done) {
			composer.stop({
				timeout : 1000
			}, function() {
				console.log('All servers stopped');
				done();
			});
		});

		it('POST a single valid event', function(done) {
			var event = {
				tags : [ 'info' ],
				data : 'test : POST a single valid event'
			};

			var request = {
				path : 'http://localhost:8000/api/runrightfast-logging-service/log',
				entity : JSON.stringify(event)
			};

			rest(request).then(function(response) {
				if (response.status.code === 202) {
					done();
				} else {
					done(new Error('Expected response.status.code = 202, but actually was : ' + response.status.code));
				}
			});

		});

		it('POST a single invalid event', function(done) {
			var event = {
				data : 'test : POST a single valid event'
			};

			var request = {
				path : 'http://localhost:8000/api/runrightfast-logging-service/log',
				entity : JSON.stringify(event)
			};

			rest(request).then(function(response) {
				if (response.status.code === 400) {
					done();
				} else {
					done(new Error('Expected response.status.code = 400, but actually was : ' + response.status.code));
				}
			});

		});

		it('POST an array of valid events', function(done) {
			var events = [ {
				tags : [ 'info' ],
				data : 'test : POST a single valid event - 1'
			}, {
				tags : [ 'info' ],
				data : 'test : POST a single valid event - 2'
			}, {
				tags : [ 'info' ],
				data : 'test : POST a single valid event - 3'
			}, {
				tags : [ 'info' ],
				data : 'test : POST a single valid event - 4'
			} ];

			var request = {
				path : 'http://localhost:8000/api/runrightfast-logging-service/log',
				entity : JSON.stringify(events)
			};

			rest(request).then(function(response) {
				if (response.status.code === 202) {
					done();
				} else {
					done(new Error('Expected response.status.code = 202, but actually was : ' + response.status.code));
				}
			});

		});
	});

});