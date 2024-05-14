import { HttpStatus, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configInformation from './common/setting-information';
import { FilmsModule } from './films/films.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ERROR_MESSAGE } from '@custom-messages/error.message';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configInformation],
    }),
    TypeOrmModule.forRoot({
      type: configInformation().database.type,
      host: configInformation().database.host,
      port: configInformation().database.port,
      username: configInformation().database.username,
      password: configInformation().database.password,
      database: configInformation().database.database,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError(errors) {
        //handle error when graphQL validation failed
        if (
          errors.extensions.code === ERROR_MESSAGE.GRAPHQL_VALIDATION_FAILED
        ) {
          return {
            message: errors.message,
            code: 'BAD_REQUEST',
            statusCode: HttpStatus.BAD_REQUEST,
          };
        }

        //handle error when class-validator throw error
        if (errors.extensions.originalError) {
          const errorClassValidator = errors.extensions.originalError;
          const message =
            errorClassValidator['message'].length === 1
              ? errorClassValidator['message'][0]
              : errorClassValidator['message'];
          return {
            message: message,
            error: errorClassValidator['error'],
            statusCode: errorClassValidator['statusCode'],
          };
        }

        //handle others error
        return {
          message: errors.message,
          code: 'INTERNAL_SERVER_ERROR',
          statusCode:
            errors.extensions.code || HttpStatus.INTERNAL_SERVER_ERROR,
        };
      },
    }),
    FilmsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
