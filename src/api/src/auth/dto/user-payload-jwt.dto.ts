export class UserPayloadJwt {
  constructor(
    readonly username: string,
    readonly sub?: string,
    readonly iat?: string,
    readonly exp?: number,
  ) {}
}
