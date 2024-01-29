import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserPayloadJwt } from './dto/user-payload-jwt.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate({ id, username }: User) {
    const payload: UserPayloadJwt = {
      sub: id,
      username,
    };
    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken,
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.getUser(username);
    if (!user) {
      throw new HttpException(
        'username or password incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isValid = await bcrypt.compare(password, user.getPassword());
    if (!isValid) {
      throw new HttpException(
        'username or password incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return { ...user, password: undefined };
  }
}
