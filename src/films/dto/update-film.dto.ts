import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { UpdateFilmRequest } from 'clt-jwat-common';
import { Field, InputType } from '@nestjs/graphql';
import { CreateFilmDTO } from './create-film.dto';
import { ERROR_MESSAGE } from '@custom-messages/error.message';

@InputType()
export class UpdateFilmDTO extends CreateFilmDTO implements UpdateFilmRequest {
  @Field()
  @IsUUID()
  @Transform(({ value }) => value.trim())
  id: string;

  @Field({ nullable: true })
  @IsString({ message: ERROR_MESSAGE.IS_NOT_EMPTY('title') })
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsOptional()
  title: string;
}
