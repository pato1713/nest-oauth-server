import { Controller, Get } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';

@Controller('.well-known')
export class DiscoveryController {
  constructor(private readonly _discoveryService: DiscoveryService) {}

  @Get('oauth-authorization-server')
  getEndpointsConfig() {
    return {
      issuer: this._discoveryService.issuer,
      authorization_endpoint: this._discoveryService.authorizationEndpoint,
      token_endpoint: this._discoveryService.tokenEndpoint,
      revocation_endpoint: this._discoveryService.revocationEndpoint,
      introspection_endpoint: this._discoveryService.introspectionEndpoint,
      jwks_uri: this._discoveryService.jwksUri,
      scopes_supported: this._discoveryService.supportedScopes,
      response_types_supported: this._discoveryService.responseTypesSupported,
      grant_types_supported: this._discoveryService.grantTypesSupported,
      token_endpoint_auth_methods_supported:
        this._discoveryService.tokenEndpointAuthMethodsSupported,
    };
  }
}
