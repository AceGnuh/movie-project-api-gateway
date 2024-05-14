import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { SearchQuery } from 'clt-jwat-common';

@ArgsType()
export class SearchQueryArgs implements SearchQuery {
  @Field({ nullable: true })
  @Transform(({ value }) => value || '')
  key: string;

  // @Field({ nullable: true })
  // maxValue: string;

  // @Field({ nullable: true })
  // minValue: string;
}
