import { UserInput } from '@/endpoints/user/dto/independent/user.type'
import { InputType } from '@nestjs/graphql'

@InputType()
export class RegisterInput extends UserInput {}
