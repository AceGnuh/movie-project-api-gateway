import { FilmController } from '@films/films.controller';
import { FilmService } from '@films/films.service';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockDataUpdate,
  mockFilm,
  mockFilmDTO,
  mockFilmId,
  mockFilmInvalidId,
  mockFilmService,
} from './__mock__/film.mock';
import { HttpStatus, NotFoundException } from '@nestjs/common';

describe('Test Film Controller', () => {
  let filmController: FilmController;
  let filmService: FilmService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        FilmController,
        {
          provide: FilmService,
          useValue: mockFilmService,
        },
      ],
    }).compile();

    filmService = testModule.get<FilmService>(FilmService);
    filmController = testModule.get<FilmController>(FilmController);
  });

  it('it should be defined', () => {
    expect(filmController).toBeDefined();
    expect(filmService).toBeDefined();
  });

  describe('query film', () => {
    it('should return null because the id is invalid', async () => {
      const result = async () => {
        return await filmController.getFilmById(mockFilmInvalidId);
      };
      expect(filmService.findById).not.toHaveBeenCalled();
      expect(result()).rejects.toThrow(NotFoundException);
    });

    it('should return a film object', async () => {
      const film = await filmController.getFilmById(mockFilmId);
      expect(filmService.findById).toHaveBeenCalledWith(mockFilmId);
      expect(film.data).toEqual(mockFilm);
      expect(film.statusCode).toBe(HttpStatus.OK);
    });

    // it('should return a list of film object', async () => {
    //   const result = await filmController.getAllFilms();
    //   expect(filmService.findAll).toHaveBeenCalled();
    //   expect(result.data).toEqual([mockFilm]);
    //   expect(result.statusCode).toBe(HttpStatus.OK);
    // });
  });

  describe('create film', () => {
    it('should create a new film object', async () => {
      const result = await filmController.createFilm(mockFilmDTO);
      expect(filmService.create).toHaveBeenCalledWith(mockFilmDTO);
      expect(result.data).toEqual(mockFilm);
      expect(result.statusCode).toBe(HttpStatus.CREATED);
    });
  });

  describe('update film', () => {
    it('should update a film object', async () => {
      const result = await filmController.updateFilm(
        mockFilmId,
        mockDataUpdate,
      );
      expect(filmService.update).toHaveBeenCalledWith(
        mockFilmId,
        mockDataUpdate,
      );
      expect(result.data).toEqual(mockFilm);
      expect(result.statusCode).toBe(HttpStatus.OK);
    });
  });

  describe('delete film', () => {
    it('should soft delete a film object', async () => {
      const result = await filmController.deleteFilm(mockFilmId);
      expect(filmService.delete).toHaveBeenCalledWith(mockFilmId);
      expect(result.data).toEqual(mockFilm);
      expect(result.statusCode).toBe(HttpStatus.OK);
    });
  });
});
