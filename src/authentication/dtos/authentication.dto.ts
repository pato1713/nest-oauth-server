import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthenticationDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
