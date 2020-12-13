"use strict";

const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

class Request {
    /**
     * Request Constructor
     * @param url base endpoint
     */
    constructor(url) {
        this.url =          url;
        this.method =       "";
        this.options =      {};
        this.body =         null;
        this.headers =      {};
        this.params =       {};
        this.contentType =  null;
        this.accept =       null
    }

    // Content Types
    isJson() {
        this.contentType = "application/json";
        this.accept = "application/json";
    }

    isPlainText() {
        this.contentType = "text/plain";
    }

    isUrlencoded() {
        this.contentType = "application/x-www-form-urlencoded";
    }

    isMultipart() {
        this.contentType = "multipart/form-data";
    }

    // Accepts
    acceptJson() {
        this.accept = "application/json";
    }
    acceptPlainText() {
        this.accept = "text/plain";
    }
    acceptXml() {
        this.accept = "application/xml";
    }


    // TODO: come out with a better solution for file uploads
    uploadMedia(field, file) {
        this.isMultipart();
        let form = new FormData();
        let filePath = path.resolve(file.path);
        form.append(field, fs.createReadStream(filePath));
        this.body = form;

        return this._request("POST");
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
        let self = this;
        let body = self.body;
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: method,
                headers: {
                    // 'Content-Type': this.contentType,
                    //'Accept': 'application/json',
                    "Content-Type": self.contentType,
                    "Accept": self.accept,
                    ...self.headers
                },
                body: self.body
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
            }).catch(err => {
                reject({
                    status: 500,
                    data: err
                });
            });
        });
    }
}

module.exports = Request;