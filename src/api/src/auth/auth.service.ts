import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserPayloadJwt } from './dto/user-payload-jwt.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import Password from '../../../domain/entities/Password';

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
    const passwordDomain = new Password(user.getPassword());
    const isValid = await passwordDomain.verify(password);
    if (!isValid) {
      throw new HttpException(
        'username or password incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return { ...user, password: undefined };
  }
}
