import User from "../../domain/entities/User";

export default interface UserRepository {
  save(user: User): Promise<void>;
  getUser(username: string): Promise<User>;
  getAll(): Promise<User[]>;
}
