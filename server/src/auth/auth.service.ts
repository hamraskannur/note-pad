import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthRepository } from './auth.repository';
import * as nodemailer from 'nodemailer';
import { loginUserDto } from './dto/loginUserDto';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository,private config: ConfigService,private jwt: JwtService) {}

  async createUser(createUserDto: CreateUserDto): Promise<{message:string,status:boolean}> {
    const result = await this.authRepository.create(createUserDto);
    if (result) {
      const newResult = await this.nodemailer(result.token, result.email);
      let message: string;
      let status: boolean;
      if (!newResult.status) {
        message = 'wrong email';
        status = false;
        return {message,status}
      }
      if (result.status === false) {
        message = 'An email has been sent to your account. Please verify';
        status = true;
      } else {
        message = 'An email has been sent to your account. Please verify.';
        status = true;
      }
      return {
        message,
        status,
      };
    }
  }

  async userLogin(loginUserDto: loginUserDto): Promise<any> {
    const result = await this.authRepository.userLogin(loginUserDto);
    if (result) {
        const accessToken = await this.createToken(
          result.email,
          result._id.toString(),
        );
        return {
          result,
          accessToken:accessToken.access_token,
          status:true
        };
      }
    
  }


  async createToken(email: string, _id: string | Types.ObjectId) {
    const payLoad = {
      email,
      _id,
    };
    const secret = "secret";
    const token = await this.jwt.signAsync(payLoad, {
      expiresIn: '1w',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }


  async verifyUser(token: string): Promise<{message:string,status:boolean}> {
    const result = await this.authRepository.verifyUser(token);
    if (result.status) {
      return { message: 'email verified successfully', status: true };
    }
    return { message: 'Invalid token', status: false };
  }

  async nodemailer(token: string, email: string): Promise<{status:boolean}>  {
    try {
      const url = `http://localhost:3001/verify/${token}`;
      const User = process.env.USER;
      const PASS = process.env.PASS;
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: 587,
        secure: true,
        auth: {
          user: User,
          pass: PASS,
        },
      });

      await transporter
        .sendMail({
          from: User,
          to: email,
          subject: 'verify Email',
          text: url,
        })
        .then(() => {
          console.log('email sent successfully');
          return 'email sent successfully';
        });
      return { status: true };
    } catch (error) {
      return { status: false };
    }
  }
}
