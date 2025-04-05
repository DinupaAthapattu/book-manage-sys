import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => ID)
  id: string; // Required

  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  publishedYear: number;

  @Field()
  genre: string;
}