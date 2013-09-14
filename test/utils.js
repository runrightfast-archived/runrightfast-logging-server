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
var utils = require('../lib/rrf-utils');
var process = require('process');

describe('utils', function() {

	describe('#serverPort()', function() {
		it('returns default port of 8000', function() {
			delete process.env.RRF_HTTP_PORT;
			expect(utils.serverPort()).to.equal(8000);
		});

		it('returns specified port if not defined in env', function() {
			expect(utils.serverPort(8080)).to.equal(8080);
		});

		it('returns process.env.RRF_HTTP_PORT if specified', function() {
			process.env.RRF_HTTP_PORT = 9080;
			expect(utils.serverPort(8080)).to.equal(9080);
			delete process.env.RRF_HTTP_PORT;
		});
	});

});