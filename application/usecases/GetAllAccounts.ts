import UseCase from './interfaces/UseCase';
import IRepository from '../interfaces/IRepository';
import { CreatedUserDto } from '../../api/src/users/dto/created-user.dto';

export default class GetAllAccounts implements UseCase {
    constructor(private useRepositoryService: IRepository) {}
    async execute(): Promise<CreatedUserDto[]> {
        return await this.useRepositoryService.findAll();
    }

}