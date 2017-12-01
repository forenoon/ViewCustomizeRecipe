/* ------ view-customizes:
 Redmine Utility
 Path pattern: /*
----------------------- */

/**
 * constructor
 * @param {string} urlRoot Redmine root URL
 * @param {string} apikey login user apikey
 */
var Redmine = function(urlRoot, apikey="")
{
	this.urlRoot = urlRoot;
	this.apikey = apikey;
}

/**
 * get & setup login user apikey.
 * @returns {Promise} "onFulfilled" 1st argment is apikey if it is succeeded.
 */
Redmine.prototype.setupApikeyAsync = function()
{
	let _self = this;
	return $.get(this.urlRoot+'/my/account')
        .then(
            (_html) => {
                _self.apikey = $("#api-access-key", $(_html)).first().text();
                return _self.apikey;
            },
            (_response) => console.log(_response.status + ":" + _response.statusText)
        );
}

/**
 * Redmine API GET method. 
 * @param {string} url REST API URL relate Redmine Root.
 * @param {Object} data REST API params.
 * @returns {Promise} "onFulfilled" 1st argment is JSON object if it is succeeded. "onRejected" has 1st argment is $.ajax response if it is access failure.
 */
Redmine.prototype.getJsonAsync = function(url, data)
{
	return $.ajax({
		type: 'get',
		url: this.urlRoot + url,
		data: data,
		headers: {'X-Redmine-API-Key': this.apikey},
		dataType: 'json',
		contentType: 'application/json',
	});
}


/**
 * Redmine API POST method. 
 * @param {string} url REST API URL relate Redmine Root.
 * @param {Object} data REST API params.
 * @returns {Promise} "onFulfilled" 1st argment is JSON object if it is succeeded. "onRejected" has 1st argment is $.ajax response if it is access failure.
 */
Redmine.prototype.postJsonAsync = function(url, data)
{
	return $.ajax({
		type: 'put',
		url: this.urlRoot + url,
		data: JSON.stringify(data),
		headers: {'X-Redmine-API-Key': this.apikey},
		dataType: 'json',
		contentType: 'application/json',
	});
}

/**
 * Redmine API PUT method. 
 * @param {string} url REST API URL relate Redmine Root.
 * @param {Object} data REST API params.
 * @returns {Promise} "onFulfilled" 1st argment is JSON string if it is succeeded. "onRejected" has 1st argment is $.ajax response if it is access failure.
 */
Redmine.prototype.putJsonAsync = function(url, data)
{
	return $.ajax({
		type: 'put',
		url: this.urlRoot + url,
		data: JSON.stringify(data),
		headers: {'X-Redmine-API-Key': this.apikey},
		dataType: 'text',
		contentType: 'application/json',
	});
}
