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

/**
 * The following options can be configured via command line args or as system
 * environment variables:
 * 
 * <pre>
 * RRF_PORT - default is 8000
 * RRF_LOG_LEVEL - default is 'WARN'
 * </pre>
 * 
 * The command line arg syntax is --PARAM=VALUE
 * 
 * e.g. node ./index.js --RRF_PORT=8080
 * 
 * 
 */
(function() {
	'use strict';

	var HapiServer = require('runrightfast-hapi-server');
	var manifest = require('./manifest');
	var config = require('runrightfast-commons').config;

	var options = {
		manifest : manifest,
		logLevel : config.param('RRF_LOG_LEVEL', 'WARN')
	};

	new HapiServer(options);

}());