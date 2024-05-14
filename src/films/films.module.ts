import { Module } from '@nestjs/common';
import { FilmService } from './films.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FILMS_PACKAGE_NAME } from 'clt-jwat-common';
import { join } from 'path';
import configInformation from 'src/common/setting-information';
import { FilmResolver } from './films.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: FILMS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: FILMS_PACKAGE_NAME,
          protoPath:
            'node_modules\\clt-jwat-common\\common\\protos\\film.proto',
          url: `${configInformation().grpc.host}:${configInformation().grpc.port}`,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [FilmService, FilmResolver],
  exports: [FilmService],
})
export class FilmsModule {}
