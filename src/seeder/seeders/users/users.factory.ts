import { RegistrationDto } from '@/authentication/dtos/registration.dto';
import { CreateUserDto } from '@/user/dtos/user.dto';

export const createRegistrationMock = (id: number): RegistrationDto => ({
  username: `username_${id}`,
  email: `email_${id}@email.com`,
  password: `password_${id}`,
});

export const generateRegistrationMockData = (count: number) => {
  return Array.from({ length: count }, (_, i) => createRegistrationMock(i + 1));
};
