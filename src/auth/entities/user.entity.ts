import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Auth {
  @Field()
  accessToken: string;

  @Field()
  user: User;
}
