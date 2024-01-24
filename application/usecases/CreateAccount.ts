import UseCase from "./interfaces/UseCase";
import { CreateUserDto } from '../../api/src/users/dto/create-user.dto';
import User from "../../domain/entities/user";
import IRepository from "../interfaces/IRepository";

export default class CreateAccount implements UseCase {
    constructor(private useRepositoryService: IRepository) {}
    async execute(input: CreateUserDto): Promise<any> {
        const user = new User(input.username, input.password, new Date(input.dateofbirth));
        return await this.useRepositoryService.create(user);
    }

}