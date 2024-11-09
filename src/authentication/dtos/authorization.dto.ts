import { Expose } from 'class-transformer';
import {
  IsDataURI,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

enum AuthorizationResponseType {
  CODE = 'code',
  TOKEN = 'token',
}

// •	response_type: Required, should be set to code for authorization code grant or token for implicit grant.
// •	client_id: Required, the client identifier issued to the application.
// •	redirect_uri: Optional, the URL to which the response will be sent (must match the registered URL).
// •	scope: Optional, space-separated list of scopes.
// •	state: Optional, value to maintain state between the request and callback.
export class AuthorizationDto {
  @IsEnum(AuthorizationResponseType)
  @IsNotEmpty()
  @Expose({
    name: 'response_type',
  })
  readonly responseType: AuthorizationResponseType;

  @IsString()
  @IsNotEmpty()
  @Expose({
    name: 'client_id',
  })
  readonly clientId: string;

  @IsDataURI()
  @IsOptional()
  @Expose({
    name: 'redirect_uri',
  })
  readonly redirectUri?: string;

  @IsString()
  @IsOptional()
  readonly scope?: string;

  @IsString()
  @IsOptional()
  readonly state?: string;
}
