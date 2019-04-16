let assert = require("assert");
let utils = require("../utils.js");

describe("The utils.constructAPIResponse function", function() {
    it("should return correctly formed object", function() {
        var response = utils.constructAPIResponse({ "result": "test" }, 202);
        assert.notStrictEqual(response, null);
        assert.strictEqual(response.statusCode, 202);
        assert.notStrictEqual(response.body, undefined);
        var body = JSON.parse(response.body);
        assert.strictEqual(body.result, "test");
    });

    it("should default to 200 for status code", function() {
        var response = utils.constructAPIResponse({ "result": "test" });
        assert.notStrictEqual(response, null);
        assert.strictEqual(response.statusCode, 200);
        assert.notStrictEqual(response.body, undefined);
        var body = JSON.parse(response.body);
        assert.strictEqual(body.result, "test");
    });

    it("should handle no parameters", function() {
        var response = utils.constructAPIResponse();
        assert.notStrictEqual(response, null);
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.body, "");
    });

    it("should handle an empty JSON object", function() {
        var response = utils.constructAPIResponse({});
        assert.notStrictEqual(response, null);
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.body, "{}");
    });

    it("should handle No Content responses", function() {
        var response = utils.constructAPIResponse(null, 204);
        assert.notStrictEqual(response, null);
        assert.strictEqual(response.statusCode, 204);
        assert.strictEqual(response.body, "");
    });

    it("should handle text responses", function() {
        var headers = {
            "Content-Type": "plain/text",
            "X-Header1": "Value 1"
        };
        var response = utils.constructAPIResponse("This would be a plain/text response", 200, headers);
        assert.notStrictEqual(response, null);
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.body, "This would be a plain/text response");
        assert.notStrictEqual(response.headers, undefined);
        assert.deepStrictEqual(response.headers, headers);
    });
});

describe("The utils.constructAPIErrorResponse function", function() {
    it("should handle Error object", function() {
        var response = utils.constructAPIErrorResponse(new Error("Something went wrong"), 400);
        assert.notStrictEqual(response, null);
        assert.strictEqual(response.statusCode, 400);
        assert.notStrictEqual(response.body, undefined);
        var body = JSON.parse(response.body);
        assert.notStrictEqual(body.message, undefined);
        assert.strictEqual(body.message, "Something went wrong");
    });

    it("should handle error string", function() {
        var response = utils.constructAPIErrorResponse("Something went wrong", 400);
        assert.notStrictEqual(response, null);
        assert.strictEqual(response.statusCode, 400);
        assert.notStrictEqual(response.body, undefined);
        var body = JSON.parse(response.body);
        assert.notStrictEqual(body.message, undefined);
        assert.strictEqual(body.message, "Something went wrong");
    });

    it("should default to 500 for status code", function() {
        var response = utils.constructAPIErrorResponse("Something went wrong");
        assert.notStrictEqual(response, null);
        assert.strictEqual(response.statusCode, 500);
        assert.notStrictEqual(response.body, undefined);
        var body = JSON.parse(response.body);
        assert.notStrictEqual(body.message, undefined);
        assert.strictEqual(body.message, "Something went wrong");
    });

    it("should handle no parameters", function() {
        var response = utils.constructAPIErrorResponse();
        assert.notStrictEqual(response, null);
        assert.strictEqual(response.statusCode, 500);
        assert.notStrictEqual(response.body, undefined);
        var body = JSON.parse(response.body);
        assert.notStrictEqual(body.message, undefined);
        assert.strictEqual(body.message, "");
    });

    it("should handle headers", function() {
        var headers = {
            "X-Header1": "Value 1",
            "X-Header2": "Value 2"
        };
        var response = utils.constructAPIErrorResponse("Something went wrong", 400, headers);
        assert.notStrictEqual(response, null);
        assert.strictEqual(response.statusCode, 400);
        assert.notStrictEqual(response.body, undefined);
        var body = JSON.parse(response.body);
        assert.notStrictEqual(body.message, undefined);
        assert.strictEqual(body.message, "Something went wrong");
        assert.notStrictEqual(response.headers, undefined);
        assert.deepStrictEqual(response.headers, headers);
    });
});