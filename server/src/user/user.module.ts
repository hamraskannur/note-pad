import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/auth/schemas/user.schema';
import { UserController } from './user.controller';
import { JwtStrategy } from 'src/auth/strategy';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { Note, NoteSchema } from './schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Note.name, schema: NoteSchema }]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        PassportModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: {
              expiresIn: '1w',
            },
          }),
      ],
      controllers: [UserController],
      providers: [ UserService,UserRepository,JwtStrategy],
      exports: [JwtModule, PassportModule],

})
export class UserModule {}
