export class CreatedUserDto {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly dateofbirth: Date,
  ) {}
}
