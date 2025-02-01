import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscoveryService {
  constructor(private readonly _config: ConfigService) {}

  get issuer() {
    return this._config.get('OAUTH_ISSUER');
  }

  get authorizationEndpoint() {
    return `${this.issuer}${this._config.get('OAUTH_AUTHORIZATION_ENDPOINT')}`;
  }

  get tokenEndpoint() {
    return `${this.issuer}${this._config.get('OAUTH_TOKEN_ENDPOINT')}`;
  }

  get revocationEndpoint() {
    return `${this.issuer}${this._config.get('OAUTH_REVOCATION_ENDPOINT')}`;
  }

  get introspectionEndpoint() {
    return `${this.issuer}${this._config.get('OAUTH_INTROSPECTION_ENDPOINT')}`;
  }

  get jwksUri() {
    return `${this.issuer}${this._config.get('OAUTH_JWKS_URI')}`;
  }

  get supportedScopes() {
    return this._config.get('OAUTH_SCOPES');
  }

  get responseTypesSupported() {
    return this._config.get('OAUTH_RESPONSE_TYPES');
  }

  get grantTypesSupported() {
    return this._config.get('OAUTH_GRANT_TYPES');
  }

  get tokenEndpointAuthMethodsSupported() {
    return this._config.get('OAUTH_TOKEN_ENDPOINT_AUTH_METHODS');
  }
}
