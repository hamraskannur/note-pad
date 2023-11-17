import { IsNotEmpty, IsEmail,MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(12)
  password: string;

  token:string

  status:boolean

  accessToken:object;

  _id:string
}
