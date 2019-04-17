'use strict';

const AuthorizationServer = require('../models/authorization-server');
const Client = require('../models/client');
const { addAuthorizationRequest, findAuthorizationRequestById, deleteAuthorizationRequestById } = require('../models/authorization-requests');
const { addAuthorizationCode, findAuthorizationCode, deleteAuthorizationCode } = require('../models/authorization-codes');

function getAuthorizationServer() {
  return AuthorizationServer.getAuthorizationServer();
}

function getClient() {
  return Client.getClient();
}

function addNewAuthorizationRequest({ reqId, reqQuery }) {
  addAuthorizationRequest({ requestId: reqId, requestQuery: reqQuery });
}

function getAuthorizationRequestById(reqId) {
  return findAuthorizationRequestById(reqId);
}

function removeAuthorizationRequestById(reqId) {
  deleteAuthorizationRequestById(reqId);
}

function addNewAuthorizationCode({ code, authInfo }) {
  addAuthorizationCode({ code, authInfo });
}

function getAuthorizationCode(code) {
  return findAuthorizationCode(code);
}

function removeAuthorizationCode(code) {
  deleteAuthorizationCode(code);
}

module.exports = {
  getAuthorizationServer,
  getClient,
  addNewAuthorizationRequest,
  getAuthorizationRequestById,
  removeAuthorizationRequestById,
  addNewAuthorizationCode,
  getAuthorizationCode,
  removeAuthorizationCode
};
