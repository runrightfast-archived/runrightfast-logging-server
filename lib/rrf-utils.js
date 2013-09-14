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

var lodash = require('lodash');

/**
 * 
 * @returns Number looks up port specified in system environment variable
 *          RRF_HTTP_PORT, but if not specified, then uses the specified value or
 *          8000 if not port is specified
 */
module.exports.serverPort = function serverPort(defaultPort) {
	if (process.env.RRF_HTTP_PORT) {
		return parseInt(process.env.RRF_HTTP_PORT, 10);
	}

	return lodash.isNumber(defaultPort) ? defaultPort : 8000;
};