import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ERROR_MESSAGE } from '@custom-messages/error.message';
import { Field, InputType } from '@nestjs/graphql';
import { CreateFilmRequest } from 'clt-jwat-common';

@InputType({ isAbstract: true })
export class CreateFilmDTO implements CreateFilmRequest {
  @Field()
  @IsString({ message: ERROR_MESSAGE.IS_STRING('title') })
  @IsNotEmpty({ message: ERROR_MESSAGE.IS_NOT_EMPTY('title') })
  @Transform(({ value }) => value.trim())
  title: string;

  @Field({ nullable: true })
  @IsString({ message: ERROR_MESSAGE.IS_STRING('description') })
  @Transform(({ value }) => value.trim())
  @IsOptional()
  description: string;

  @Field({ nullable: true })
  @IsString({ message: ERROR_MESSAGE.IS_STRING('thumbnail') })
  @IsOptional()
  thumbnail: string;

  @Field({ nullable: true })
  @IsNumber({}, { message: ERROR_MESSAGE.IS_NUMBER('duration') })
  @Min(1, { message: ERROR_MESSAGE.MIN_VALUE('duration') })
  @IsOptional()
  duration: number;

  @Field({ nullable: true })
  @IsString({ message: ERROR_MESSAGE.IS_STRING('path') })
  @IsOptional()
  path: string;

  @Field({ nullable: true })
  @IsNumber({}, { message: ERROR_MESSAGE.IS_NUMBER('order') })
  @IsOptional()
  order: number;

  @Field({ nullable: true })
  @IsBoolean({ message: ERROR_MESSAGE.IS_BOOLEAN('status') })
  @IsOptional()
  status: boolean;

  @Field({ nullable: true })
  @IsDate({ message: ERROR_MESSAGE.IS_DATE('releasedDate') })
  @IsOptional()
  releaseDate: Date;
}
