import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/auth/dto/createUser.dto';
import { CreateNoteDto } from './dto/CreateNoteDto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async createNote(
    CreateNoteDto: CreateNoteDto,
    id: string,
  ): Promise<{ message: string; status: boolean }> {
    const result = await this.userRepository.createNote(CreateNoteDto, id);

    return result;
  }

  async getAllNotes(id: string): Promise<{ message: string; status: boolean }> {
    const result = await this.userRepository.getAllNotes(id);

    return result;
  }

  async getNote(id: string): Promise<{ message: string; status: boolean }> {
    const result = await this.userRepository.getNote(id);
    return result;
  }

  async noteUpdate(nodeData: CreateNoteDto): Promise<{ message: string; status: boolean }> {
    const result = await this.userRepository.noteUpdate(nodeData);
    return result;
  }


  
}
