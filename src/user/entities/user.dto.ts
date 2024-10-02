import { IsNotEmpty, IsString } from 'class-validator';
export class UserDto {
  @IsNotEmpty({ message: 'Please define user name' })
  @IsString({ message: 'User name should be string' })
  userName: string;
  @IsNotEmpty({ message: 'Please define password' })
  password: string;
}
