"use strict";

var proxyquire = require("proxyquire");
var test = require("tape");

var fsStub = {
  writeFile: function (filename, data, cb) {
    cb(null, "yay");
  }
};

var fs = proxyquire("../src/lib/fileinfo", {
  fs: fsStub
});

test("fs.writeFile() should be stubbed", function (t) {
  t.plan(2);
  fs.writeFile(null, null, function (err, body) {
    t.ifError(err, "no error should be present");
    t.equal(body, "huzzah", "body value");
  });
});
