"use strict";
const fetch = require('node-fetch');

class Request {
    constructor(url) {
        // this.fetch = require('node-fetch');
        this.url = url;
        this.method = "";
        this.options = {};
        this.body = null;
        this.headers = {};
        this.params = {};
    }

    get() {
        return this._request('GET');
    }

    post(body) {
        this.body = body;
        return this._request('POST');
    }

    put(body) {
        this.body = body;
        return this._request("PUT");
    }

    setHeaders(headers) {
        this.headers = headers;
    }

    setParams(obj) {
        this.params = obj;
    }

    _getQueryString() {
        return Object.keys(this.params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(this.params[k]))
            .join('&');
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