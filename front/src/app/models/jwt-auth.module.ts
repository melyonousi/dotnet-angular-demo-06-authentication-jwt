import { User } from "./user.module"

export class JwtAuth {
  user!: User
  token: string = ''
  result: boolean = true
  error: any
}
