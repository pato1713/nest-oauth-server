import { IsArray, IsEnum, IsString } from 'class-validator';
import { ClientType } from '../enums/client-type.enum';
import { GrantType } from '../enums/grant-type.enum';

export class OAuthClientDto {
  @IsString()
  public clientId: string;

  @IsString()
  public clientSecret: string;

  @IsArray()
  public redirectUris: string[];

  @IsEnum(ClientType)
  public clientType: ClientType;

  @IsArray()
  @IsEnum(GrantType)
  public grantTypes: GrantType[];
}
