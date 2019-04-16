"use strict";

exports.constructAPIResponse = (body, statusCode, headers) => {
    var bodyString = "";

    if (body) {
        if (typeof body === "string") {
            bodyString = body;
        } else {
            bodyString = JSON.stringify(body);
        }
    } 

    if (!statusCode) {
        statusCode = 200;
    }

    var response = {
        statusCode: statusCode,
        body: bodyString
    };

    if (headers) {
        response.headers = headers;
    }

    return response;
};

exports.constructAPIErrorResponse = (error, statusCode, headers) => {
    var messageString = "";
    
    if (error) {
        if (typeof error === "string") {
            messageString = error;
        } else {
            messageString = error.message;
        }
    }

    var body = {
        message: messageString
    };

    if (!statusCode) {
        statusCode = 500;
    }
    
    return exports.constructAPIResponse(body, statusCode, headers);
};