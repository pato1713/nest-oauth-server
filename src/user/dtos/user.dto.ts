import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAuthenticationDto } from 'src/authentication/dtos/authentication.dto';

export class CreateUserDto extends CreateAuthenticationDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;
}
