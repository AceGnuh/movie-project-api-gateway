import { Field, ObjectType } from '@nestjs/graphql';
import { Film, FilmResponse as FilmResponseProto } from 'clt-jwat-common';

@ObjectType()
export class FilmResponse implements FilmResponseProto {
  @Field()
  data: Film;

  @Field()
  message: string;

  @Field()
  code?: number;
}
