import { Injectable } from '@nestjs/common';
import User from '../../../domain/entities/user';
import { User as UserEntityOrm } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserRepository from '../../../application/repositories/UserRepository';

@Injectable()
export class UsersService implements UserRepository {
  constructor(
    @InjectRepository(UserEntityOrm)
    private userRepository: Repository<UserEntityOrm>,
  ) {}
  async save(user: User): Promise<void> {
    const userEntityDB = this.userRepository.create({ ...user });
    await this.userRepository.save(userEntityDB);
  }
  async getUser(userName: string): Promise<User> {
    const { id, username, password, dateofbirth } =
      await this.userRepository.findOne({
        where: { username: userName },
      });
    return User.buildExistingUser(
      id,
      username,
      password,
      new Date(dateofbirth),
    );
  }
  async getAll(): Promise<User[]> {
    const users: User[] = [];
    const usersEntityDB = await this.userRepository.find();
    for (const user of usersEntityDB) {
      users.push(
        User.buildExistingUser(
          user.id,
          user.username,
          user.password,
          new Date(user.dateofbirth),
        ),
      );
    }
    return users;
  }
}
