import { Injectable } from '@nestjs/common';
import { User as entityDB } from './entities/user.entity';
import IRepository from '../../../application/interfaces/IRepository';
import { Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../../../domain/entities/User';
import * as bcrypt from 'bcrypt';
import { PayloadUserLoginDto } from 'src/auth/dto/payload-user-login.dto';

@Injectable()
export class UsersRepositoryService implements IRepository {
  constructor(
    @InjectRepository(entityDB) private userRepository: Repository<entityDB>,
  ) {}
  async create(user: User): Promise<entityDB> {
    const newUser = this.userRepository.create({ id: randomUUID(), ...user });
    const newUserPassHash = {
      ...newUser,
      password: await bcrypt.hash(newUser.password, 10),
    };
    return await this.userRepository.save(newUserPassHash);
  }
  async findAll(): Promise<entityDB[]> {
    return await this.userRepository.find();
  }
  async find({ username, password }: PayloadUserLoginDto): Promise<any> {
    return await this.userRepository.findOne({
      where: [{ username }, { password }],
    });
  }
  update(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
