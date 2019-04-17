
class Client {
  constructor({ 'client_name': clientName = undefined, 'client_id': clientId, 'client_secret': clientSecret, 'redirect_uris': redirectUris, 'logo_uri': clientLogoUri = undefined, scope}) {
    this['client_name'] = clientName;
    this['client_id'] = clientId;
    this['client_secret'] = clientSecret;
    this['redirect_uris'] = redirectUris;
    this.scope = scope;
    this['logo_uri'] = clientLogoUri;
  }

  get() {
    return {
      'client_name': this['client_name'],
      'client_id': this['client_id'],
      'client_secret': this['client_secret'],
      'redirect_uris': this['redirect_uris'],
      scope: this.scope,
      'logo_uri': this['logo_uri']
    };
  }


  static getClient() {
    return client;
  }
}

const client = new Client({
  'client_name': 'Client#1', 
  'client_id': `oauth-client-1`, 
  'client_secret': `oauth-client-secret-1`,
  'redirect_uris': [`http://localhost:9000/callback`],
  'scope': `foo bar`,
  'logo_uri': '/images/bomb.png' // Internet URI also works
});

module.exports = Client;
