export default class User {
  constructor(
    private username: string,
    private password: string,
    private dateofbirth: Date,
    private id?: string,
  ) {
    if (this.username === undefined || this.password === undefined) {
      throw new Error("User or password empty");
    }
    if (
      Math.abs(new Date().getFullYear() - this.dateofbirth.getFullYear()) < 18
    ) {
      throw new Error("Age minor");
    }
  }
  getId(): string | undefined {
    if (!this.id) {
      throw new Error("id not found");
    }
    return this.id;
  }
  getUsername(): string {
    return this.username;
  }
  getPassword(): string {
    return this.password;
  }
  getDateOfBirth(): Date {
    return this.dateofbirth;
  }
  static buildExistingUser(
    id: string,
    username: string,
    password: string,
    dateofbirth: Date,
  ): User {
    return new User(username, password, dateofbirth, id);
  }
}
