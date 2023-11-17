import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateNoteDto } from './dto/CreateNoteDto';
import { AuthGuard } from '@nestjs/passport';
import { put } from 'superagent';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/createNote')
  async createUser(
    @Request() req,
    @Body() CreateNoteDto: CreateNoteDto,
  ): Promise<{ message: string; status: boolean }> {
    const { _id } = req.user;
    const result = await this.userService.createNote(CreateNoteDto, _id);
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/getAllNotes')
  async getAllNotes(
    @Request() req,
  ): Promise<{ message: string; status: boolean }> {
    const { _id } = req.user;
    const result = await this.userService.getAllNotes(_id);
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/note/:id')
  async note(
    @Param('id') id: string,
  ): Promise<{ message: string; status: boolean }> {
    if (!id) {
      return { message: 'note', status: false };
    }
    const result = await this.userService.getNote(id);
    return result;
  }


  @UseGuards(AuthGuard('jwt'))
  @Put('/noteUpdate')
  async noteUpdate(
    @Body() nodeData: CreateNoteDto,
  ): Promise<{ message: string; status: boolean }> {
    const result = await this.userService.noteUpdate(nodeData);
    return result;
  }
}
