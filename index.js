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

(function() {
	'use strict';

	var domain = require('domain');
	var serverDomain = domain.create();

	var Hapi = require('hapi');

	var manifest = require('./manifest');
	var composer = new Hapi.Composer(manifest);

	var log = function(msg) {
		console.log(new Date().toISOString() + ' : ' + msg);
	};

	var logError = function(msg) {
		console.error(new Date().toISOString() + ' : ' + msg);
	};

	var shutdown = function(event) {
		log(event);
		if (composer) {
			log('Shutting down ...');
			composer.stop({
				timeout : 60 * 1000
			}, function() {
				composer = undefined;
				log('All servers stopped');
				serverDomain.dispose();
				process.exit(0);
			});
		}
	};

	process.on('exit', function() {
		shutdown('exit');
	});

	process.on('SIGTERM', function() {
		shutdown('SIGTERM');
	});

	serverDomain.on('error', function(error) {
		logError('Unexpected error - process will exit : ' + error);
		shutdown();
		process.exit(1);
	});

	serverDomain.run(function() {
		composer.compose(function(err) {
			if (err) {
				logError('Failed composing servers : ' + err.message);
				throw err;
			} else {
				log('Hapi is composed.');
				composer.start(function() {
					log('All servers started : pid = ' + process.pid);
				});
			}
		});
	});

}());