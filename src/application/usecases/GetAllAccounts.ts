import UseCase from "./interfaces/UseCase";
import UserRepository from "../repositories/UserRepository";
import ResponseUser from "../interfaces/ResponseUser";

export default class GetAllAccounts implements UseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(): Promise<ResponseUser[]> {
    const resposeUsers: ResponseUser[] = [];
    const users = await this.userRepository.getAll();
    for (const user of users) {
      resposeUsers.push({
        id: user.getId() ?? "",
        username: user.getUsername(),
        dateofbirth: user.getDateOfBirth(),
      });
    }
    return resposeUsers;
  }
}
