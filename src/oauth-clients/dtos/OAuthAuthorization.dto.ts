import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum AuthorizationResponseType {
  CODE = 'code',
  TOKEN = 'token',
}

/**
 * Authorization Request Parameters
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1
 */
export class OAuthAuthorizationDto {
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

  @IsString()
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
