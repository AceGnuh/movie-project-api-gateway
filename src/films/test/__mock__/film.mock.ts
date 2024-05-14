import { imageDirectory } from '@constants';
import { FILM_ERROR_MESSAGE } from '@custom-messages/film.message';
import { CreateFilmDTO } from '@films/dto/create-film.dto';
import { UpdateFilmDTO } from '@films/dto/update-film.dto';
import { Film } from '@films/entities/film.entity';
import {
  BadRequestException,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

export const mockFilm: Film = {
  filmId: 'ca519142-a44d-45fd-98a5-298df1b72fa6',
  title: 'The Godfather',
  description:
    'A young girl enters the world of spirits and must find a way to save her parents.',
  status: true,
  view: 12000,
  duration: 120,
  thumbnail: 'spirited_away.png',
  path: 'movies/spirited_away.mkv',
  order: 3,
  director: 'Hayao Miyazaki',
  releasedDate: new Date('2001-07-20T00:00:00.000Z'),
  createdAt: new Date('2024-04-24T07:00:06.720Z'),
  modifiedAt: new Date('2024-04-24T07:00:06.720Z'),
  deletedAt: null,
};

export const mockFilmDTO: CreateFilmDTO = {
  title: 'The Godfather',
  description:
    'A young girl enters the world of spirits and must find a way to save her parents.',
  status: true,
  // view: 12000,
  duration: 120,
  thumbnail: 'spirited_away.png',
  path: 'movies/spirited_away.mkv',
  order: 3,
  releaseDate: new Date('2001-07-20T00:00:00.000Z'),
};

export const mockDataUpdate = {
  title: 'The Godfather',
  description:
    'A young girl enters the world of spirits and must find a way to save her parents.',
  status: true,
  view: 12000,
  duration: 120,
  thumbnail: 'spirited_away.png',
  path: 'movies/spirited_away.mkv',
  order: 3,
  releaseDate: new Date('2001-07-20T00:00:00.000Z'),
};

export const mockFilmUpdate: Film = {
  filmId: 'b055053d-215b-4beb-95d1-a6b4e352d0ff',
  title: 'The Godfather 2',
  description:
    'A young girl enters the world of spirits and must find a way to save her parents.',
  status: true,
  view: 12000,
  duration: 120,
  thumbnail: 'Interstellar.jpeg',
  path: 'movies/spirited_away.mkv',
  order: 3,
  director: 'Hayao Miyazaki',
  releasedDate: new Date('2001-07-20T00:00:00.000Z'),
  createdAt: new Date('2024-04-24T07:00:06.720Z'),
  modifiedAt: new Date('2024-04-24T07:00:06.720Z'),
  deletedAt: null,
};

export const mockFilmTitleExist = 'The Godfather 2';

export const mockFilmId = 'ca519142-a44d-45fd-98a5-298df1b72fa6';
export const mockFilmInvalidId = 'ca519142-a44d-45fd-98a5-298df1b72fa7';

export const mockThumbnailFilm = () => {
  const thumbnailFilmData = mockFilm.thumbnail;
  const thumbnailFilmImage = createReadStream(
    join(process.cwd(), imageDirectory, thumbnailFilmData),
  );
  return new StreamableFile(thumbnailFilmImage);
};

export const mockFilmService = {
  findById: jest.fn().mockImplementation((id: string) => {
    if (id !== mockFilmId) {
      throw new NotFoundException(FILM_ERROR_MESSAGE.NOT_FOUND);
    }
    return mockFilm;
  }),
  findAll: jest.fn().mockImplementation(() => [mockFilm]),
  getImageFilm: jest.fn().mockImplementation(() => mockThumbnailFilm()),
  create: jest.fn().mockImplementation((film: CreateFilmDTO) => {
    if (film.title === mockFilmTitleExist) {
      throw new BadRequestException(FILM_ERROR_MESSAGE.TITLE_EXIST);
    }
    return mockFilm;
  }),
  update: jest
    .fn()
    .mockImplementation((filmId: string, film: UpdateFilmDTO) => {
      if (filmId != mockFilm.filmId) {
        throw new BadRequestException(FILM_ERROR_MESSAGE.NOT_FOUND);
      }

      if (film.title === mockFilmTitleExist) {
        throw new BadRequestException(FILM_ERROR_MESSAGE.TITLE_EXIST);
      }

      return mockFilm;
    }),
  delete: jest.fn().mockResolvedValue(mockFilm),
};

export const mockFilmRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  softDelete: jest.fn(),
};
