import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'secret',
            signOptions: {
              expiresIn: '1w',
            },
          }),
      ],
      controllers: [AuthController],
      providers: [ AuthService,AuthRepository,JwtStrategy],
      exports: [JwtModule, PassportModule],

})
export class AuthModule {}
