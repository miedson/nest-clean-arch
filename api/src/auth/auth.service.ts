import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserPayloadJwt } from './dto/user-payload-jwt.dto';
import { UsersRepositoryService } from 'src/users/users-repository.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepositoryService: UsersRepositoryService,
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
    const user = await this.usersRepositoryService.find({ username, password });
    if (!user) {
      throw new HttpException(
        'username or password incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new HttpException(
        'username or password incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return { ...user, password: undefined };
  }
}
