import { UpdateFilmDTO } from '@films/dto/update-film.dto';
import { SearchQueryArgs } from '@films/dto/search-query.dto';
import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  CreateFilmRequest,
  Film,
  FILMS_PACKAGE_NAME,
  FILMS_SERVICE_NAME,
  FilmsServiceClient,
} from 'clt-jwat-common';

@Injectable()
export class FilmService implements OnModuleInit {
  private filmService: FilmsServiceClient;

  constructor(@Inject(FILMS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.filmService =
      this.client.getService<FilmsServiceClient>(FILMS_SERVICE_NAME);
  }

  async getFilmById(id: string): Promise<Film> {
    const film = await lastValueFrom(this.filmService.findOne({ id: id }));

    if (film.code === HttpStatus.NOT_FOUND) {
      throw new NotFoundException(film.message);
    }

    return film.data;
  }

  async getAllFilms(args: SearchQueryArgs): Promise<Film[]> {
    const films = await lastValueFrom(this.filmService.findAllFilms(args));

    if (!films.data) {
      throw new BadRequestException(films.message);
    }

    return films.data;
  }

  async createFilm(film: CreateFilmRequest) {
    const createdFilm = await lastValueFrom(this.filmService.createFilm(film));

    if (!createdFilm.data) {
      throw new BadRequestException(createdFilm.message);
    }

    return createdFilm.data;
  }

  async updateFilm(film: UpdateFilmDTO) {
    const updatedFilm = await lastValueFrom(this.filmService.updateFilm(film));

    if (!updatedFilm.data) {
      throw new BadRequestException(updatedFilm.message);
    }

    return updatedFilm.data;
  }

  async deleteFilm(id: string): Promise<Film> {
    const deletedFilm = await lastValueFrom(
      this.filmService.deleteFilm({ id }),
    );

    if (deletedFilm.code === HttpStatus.NOT_FOUND) {
      throw new NotFoundException(deletedFilm.message);
    }

    return deletedFilm.data;
  }
}
