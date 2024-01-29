import * as bcrypt from "bcrypt";

export default class Password {
  static MIN_LENGTH_PASS = 8;
  static SALT_OF_ROUNDS = 10;
  constructor(private readonly password: string) {
    if (password.length < Password.MIN_LENGTH_PASS) {
      throw new Error("Password does not match the criteria");
    }
  }
  async create(): Promise<string> {
    return await bcrypt.hash(this.password, 10);
  }

  async verify(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
