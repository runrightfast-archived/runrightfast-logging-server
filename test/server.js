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
var manifest = require('../manifest');
var http = require('http');

var utils = require('../lib/rrf-utils');

var logApiOptions = {
	hostname : 'localhost',
	port : utils.serverPort(8000),
	path : '/log',
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

describe('Logging Server', function() {

	it('is composed', function(done) {
		var composer = new Hapi.Composer(manifest);

		composer.compose(function(err) {

			if (err) {
				console.log('Failed composing');
				done(err);
			}

			done();
		});
	});

	describe('testing running HTTP server', function() {
		var composer = null;

		before(function(done) {
			composer = require('../index');
			done();
		});

		after(function(done) {
			composer.stop(function() {
				console.log('All servers stopped');
			});
			done();
		});

		it('/log - POST a single valid event', function(done) {
			var event = {
				tags : [ 'info' ],
				data : 'test : /log - POST a single valid event'
			};

			postEvents(event, function(response) {
				expect(response.statusCode).to.equal(202);
				done();
			}, done);

		});

		it('/log - POST an array of valid events', function(done) {
			var events = [ {
				tags : [ 'info' ],
				data : 'test : /log - POST a single valid event - 1'
			}, {
				tags : [ 'info' ],
				data : 'test : /log - POST a single valid event - 2'
			}, {
				tags : [ 'info' ],
				data : 'test : /log - POST a single valid event - 3'
			}, {
				tags : [ 'info' ],
				data : 'test : /log - POST a single valid event - 4'
			} ];

			postEvents(events, function(response) {
				expect(response.statusCode).to.equal(202);
				done();
			}, done);

		});
	});

});