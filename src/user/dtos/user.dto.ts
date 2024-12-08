import { IsNotEmpty, IsString } from 'class-validator';
import { AuthenticationDto } from '@/authentication/dtos/authentication.dto';

export class CreateUserDto extends AuthenticationDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;
}
