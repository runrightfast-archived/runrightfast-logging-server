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

	
});