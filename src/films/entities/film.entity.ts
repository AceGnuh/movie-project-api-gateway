import { Field, ObjectType } from '@nestjs/graphql';
import { Film as FilmProto } from 'clt-jwat-common';

@ObjectType()
export class Film implements FilmProto {
  @Field()
  filmId: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  status: boolean;

  @Field({ nullable: true })
  view: number;

  @Field({ nullable: true })
  order: number;

  @Field({ nullable: true })
  thumbnail: string;

  @Field({ nullable: true })
  path: string;

  @Field({ nullable: true })
  director: string;

  @Field({ nullable: true })
  duration: number;

  @Field({ nullable: true })
  releasedDate: Date;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  modifiedAt: Date;

  @Field({ nullable: true })
  deletedAt: Date;
}
