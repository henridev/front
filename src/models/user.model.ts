export class User {
  constructor(
    public registration_number: string,
    public line_id: string,
    public organisation: string,
    public roles: Array<number>,
    public id?: number
  ) {}
}
