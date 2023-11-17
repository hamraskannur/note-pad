import { IsNotEmpty, IsEmail,MinLength, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  title: string;

  description:string
  backgroundColor:string
  textColor:string
  userId:string
  _id:string
}
