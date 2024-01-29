export class CreateUserDto {
  constructor(
    readonly username: string,
    readonly password: string,
    readonly dateofbirth: Date,
  ) {}
}
