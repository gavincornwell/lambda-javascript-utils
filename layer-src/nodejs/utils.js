"use strict";

const logger = new (require("./logger.js"))();
const https = require("https");
const url = require("url");

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

exports.signalSuccessToCloudFormation = (event, context, physicalResourceId, data) => {
  if (!data) data = {};
  return sendCloudFormationResponse(event, context, "SUCCESS", physicalResourceId, data);
};

exports.signalFailureToCloudFormation = (event, context, physicalResourceId, data) => {
  if (!data) data = {};
  return sendCloudFormationResponse(event, context, "FAILED", physicalResourceId, data);
};

var sendCloudFormationResponse = (event, context, status, physicalResourceId, data) => {
  logger.info(`Sending ${status} response to: ${event.ResponseURL}`);

  // NOTE: use the built in network support so we don't need dependencies

  // prepare the body
  let responseBody = JSON.stringify({
    Status: status,
    Reason: "See the details in CloudWatch Log Stream: " + context.logStreamName,
    PhysicalResourceId: physicalResourceId,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Data: data
  });

  // prepare the request options
  let parsedUrl = url.parse(event.ResponseURL);
  let options = {
    hostname: parsedUrl.hostname,
    port: 443,
    path: parsedUrl.path,
    method: "PUT",
    headers: {
      "Content-Type": "",
      "Content-Length": responseBody.length
    }
  };

  logger.debug("Using response body: " + responseBody);

  // prepare the request
  let request = https.request(options, function (response) {
    logger.info("Successfully signalled to CloudFormation: " + response.statusCode);
  });

  // log any errors
  request.on("error", function (error) {
    logger.error(error);
  });

  // send the request
  request.write(responseBody);
  request.end();
};