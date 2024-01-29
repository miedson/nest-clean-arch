import UseCase from "./interfaces/UseCase";
import { CreateUserDto } from "../../api/src/users/dto/create-user.dto";
import User from "../../domain/entities/User";
import UserRepository from "../repositories/UserRepository";
import Password from "../../domain/entities/Password";
import { randomUUID } from "crypto";

export default class CreateAccount implements UseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(input: CreateUserDto): Promise<any> {
    const password = new Password(input.password);
    const user = new User(
      input.username,
      await password.create(),
      new Date(input.dateofbirth),
      randomUUID(),
    );
    return await this.userRepository.save(user);
  }
}
