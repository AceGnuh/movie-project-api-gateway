import { Film } from './entities/film.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FilmService } from './films.service';
import { CustomParseUUIDPipe } from 'src/middlewares/custom-parse-uuid.middleware';
import { CreateFilmDTO } from '@films/dto/create-film.dto';
import { SearchQueryArgs } from '@films/dto/search-query.dto';
import { UpdateFilmDTO } from '@films/dto/update-film.dto';

@Resolver((of) => Film)
export class FilmResolver {
  constructor(private readonly filmService: FilmService) {}

  @Query((returns) => [Film])
  getAllFilms(@Args() args: SearchQueryArgs): Promise<Film[]> {
    return this.filmService.getAllFilms(args);
  }

  @Query((returns) => Film)
  getFilmById(@Args('id', CustomParseUUIDPipe) id: string): Promise<Film> {
    return this.filmService.getFilmById(id);
  }

  @Mutation((returns) => Film)
  createFilm(@Args('createFilmDTO') args: CreateFilmDTO): Promise<Film> {
    return this.filmService.createFilm(args);
  }

  @Mutation((returns) => Film)
  updateFilm(@Args('updateFilmDTO') args: UpdateFilmDTO): Promise<Film> {
    return this.filmService.updateFilm(args);
  }

  @Mutation((returns) => Film)
  deleteFilm(@Args('id', CustomParseUUIDPipe) id: string): Promise<Film> {
    return this.filmService.deleteFilm(id);
  }
}
