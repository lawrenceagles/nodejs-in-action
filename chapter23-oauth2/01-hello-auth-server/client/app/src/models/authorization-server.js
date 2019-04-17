class AuthorizationServer {
  constructor({ authorizationEndpoint, tokenEndpoint }) {
    this.authorizationEndpoint = authorizationEndpoint;
    this.tokenEndpoint = tokenEndpoint;
  }

  get() {
    return {
      authorizationEndpoint: this.authorizationEndpoint, tokenEndpoint: this.tokenEndpoint
    };
  }

  getAuthorizationEndpoint() {
    return this.authorizationEndpoint;
  }

  getTokenEndpoint() {
    return this.tokenEndpoint;
  }

  static getAuthorizationServer() {
    return authServer;
  }
}


const authServer = new AuthorizationServer({ 
  authorizationEndpoint: `http://localhost:9001/authorize`,
  tokenEndpoint: `http://localhost:9001/token`
});

module.exports = AuthorizationServer;

