import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { loginUserDto } from './dto/loginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{message:string,status:boolean}> {
    const result = await this.authService.createUser(createUserDto);
    return result;
  }

  
  @Post('/login')
  async userLogin(
    @Body() loginUserDto: loginUserDto,
  ): Promise<CreateUserDto> {
    const result = await this.authService.userLogin(loginUserDto);
    return result;
  }

  @Put('/verify/:token')
  async verifyUser(
    @Param('token') token: string,
  ): Promise<{message:string,status:boolean}> {
    const result = await this.authService.verifyUser(token);
    return result;
  }

}
