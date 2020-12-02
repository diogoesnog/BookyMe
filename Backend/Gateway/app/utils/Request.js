"use strict";

const fetch = require('node-fetch');

class Request {
    /**
     * Request Constructor
     * @param url base endpoint
     */
    constructor(url) {
        this.url =      url;
        this.method =   "";
        this.options =  {};
        this.body =     {};
        this.headers =  {};
        this.params =   {};
    }

    /**
     * Perform GET Request
     * @returns {Promise<unknown>}
     */
    get() {
        return this._request("GET");
    }

    /**
     * Perform POST request with Body
     * @param body
     * @returns {Promise<unknown>}
     */
    post(body) {
        this.body = body;
        return this._request("POST");
    }

    /**
     * Perform PUT request with Body
     * @param body
     * @returns {Promise<unknown>}
     */
    put(body) {
        this.body = body;
        return this._request("PUT");
    }

    patch(body) {
        this.body = body;
        return this._request("PATCH");
    }

    delete() {
        return this._request("DELETE");
    }

    /**
     * Set Request Headers
     * @param headers object
     */
    setHeaders(headers) {
        this.headers = headers;
    }

    /**
     * Set Request Body
     * @param body
     */
    setBody(body) {
        this.body = body;
    }

    /**
     * Add a single property to Request Body
     * @param id
     * @param value
     */
    appendBody(id, value) {
        this.body[id] = value;
    }

    /**
     * Set Request parameters a.k.a. Query String
     * @param obj
     */
    setParams(obj) {
        this.params = obj;
    }

    /**
     * Add a single parameter to Request
     * @param id
     * @param value
     */
    appendParam(id, value) {
        this.params[id] = value;
    }

    /**
     * Get formatted Query String
     * @returns {string}
     * @private
     */
    _getQueryString() {
        return Object.keys(this.params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(this.params[k]))
            .join('&');
    }

    /**
     * Add a single header to Request
     * @param id
     * @param value
     */
    appendHeader(id, value) {
        this.headers[id] = value;
    }



    _request(method) {
        let url = `${this.url}${this._getQueryString()}`
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...this.headers
                },
                body: this.body
            }).then(response => {
                return response.json()
                    .then(json => {
                        let resObj = {
                            status: response.status,
                            headers: response.headers,
                            data: json
                        };

                        if(response.ok) {
                            resolve(resObj);
                        } else {
                            reject(resObj);
                        }
                    });
            });
        });
    }
}

module.exports = Request;