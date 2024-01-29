import UserRepository from "../../application/repositories/UserRepository";
import User from "../../domain/entities/User";
import Connection from "../database/Connection";

export default class UserRepositorySql implements UserRepository {
  constructor(private readonly connection: Connection) {}
  async getAll(): Promise<User[]> {
    const users: User[] = []; 
    const usersData = await this.connection.query('select * from "user"', []);
    for(const userData of usersData) {
      users.push(User.buildExistingUser(userData.id, userData.username, userData.password, new Date(userData.dateofbirth)));
    }
    return users;
  }
  async save(user: User): Promise<void> {
    await this.connection.query(
      'insert into "user" (id, username, password, dateofbirth) values ($1, $2, $3, $4)',
      [
        user.getId(),
        user.getUsername(),
        user.getPassword(),
        user.getDateOfBirth(),
      ],
    );
  }
  getUser(username: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
