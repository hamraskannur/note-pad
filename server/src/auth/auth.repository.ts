import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { loginUserDto } from './dto/loginUserDto';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const userExist: CreateUserDto = await this.userModel.findOne({
        email: createUserDto.email,
      });
      let message: string;
      let status: boolean;
      if (userExist) {
        if (userExist.status === false) {
          return userExist;
        }

        const message = 'User already exists';
        const status = false;
  
        throw new ConflictException({ message, status });
  
      }
 
      const password = await argon2.hash(createUserDto.password);
      const token = (await randomBytes(32)).toString('hex');

      createUserDto.password = password;
      createUserDto.token = token;
      let newUser = new this.userModel(createUserDto);
      let userCreated = await newUser.save();
      return userCreated;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async userLogin(loginUserDto: loginUserDto): Promise<loginUserDto> {
    try {
      const user: loginUserDto = await this.userModel.findOne({
        email: loginUserDto.email,
      });
      if (!user) {
        const message = 'Invalid email address ';
        const status = false;
        throw new ConflictException({ message, status });
      }
      if (user) {
        const passwordCheck = await argon2.verify(
          user.password,
          loginUserDto.password,
        );
        if (!passwordCheck){
    
          const message = 'wrong password';
          const status = false;
    
          throw new ConflictException({ message, status });
          
        }else {
          return this.userModel.findOne(
            { email: loginUserDto.email },
            { password: 0 },
          );
        }
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyUser(token: string): Promise<any> {
    try {
      const user = await this.userModel.findOne({ token });

      if (!user) {
        throw new HttpException('invalid token', HttpStatus.NOT_ACCEPTABLE);
      }

      if (user.status) {
        return;
      }
      user.status = true;
      user.save(); 
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
