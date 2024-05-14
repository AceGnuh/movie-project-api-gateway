import { Test, TestingModule } from '@nestjs/testing';
import { FilmService } from '@films/films.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import {
  mockDataUpdate,
  mockFilm,
  mockFilmDTO,
  mockFilmId,
  mockFilmInvalidId,
  mockFilmRepository,
  mockFilmUpdate,
} from './__mock__/film.mock';
import { Film } from '@entities/film.entity';
import { FILM_ERROR_MESSAGE } from '@custom-messages/film.message';
import { NotFoundException } from '@nestjs/common';

describe('Test FilmService', () => {
  let filmService: FilmService;
  let filmRepository: Repository<Film>;

  const FILM_REPOSITORY_TOKEN = getRepositoryToken(Film);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmService,
        {
          provide: FILM_REPOSITORY_TOKEN,
          useValue: mockFilmRepository,
        },
      ],
    }).compile();
    filmService = module.get<FilmService>(FilmService);
    filmRepository = await module.get(FILM_REPOSITORY_TOKEN);
  });

  it('should be defined service', () => {
    expect(filmService).toBeDefined();
  });

  it('should be defined repository', () => {
    expect(filmRepository).toBeDefined();
  });

  describe('query film', () => {
    it('should return a list of film object', async () => {
      jest.spyOn(filmRepository, 'find').mockResolvedValue([mockFilm]);

      const films = await filmService.findAll();

      expect(filmRepository.find).toHaveBeenCalledTimes(1);
      expect(filmRepository.find).toHaveBeenCalled();
      expect(films).toEqual([mockFilm]);
    });

    it('should return a film object', async () => {
      jest.spyOn(filmRepository, 'findOne').mockResolvedValue(mockFilm);

      const film = await filmService.findById(mockFilmId);

      expect(filmRepository.findOne).toHaveBeenCalledTimes(1);
      expect(filmRepository.findOne).toHaveBeenCalledWith({
        where: { filmId: mockFilmId, status: true },
      });
      expect(film).toEqual(mockFilm);
    });

    it('should return not found exception when input an invalid id', async () => {
      jest.spyOn(filmRepository, 'findOne').mockReturnValue(null);

      await expect(filmService.findById(mockFilmInvalidId)).rejects.toThrow(
        NotFoundException,
      );
      expect(filmRepository.findOne).toHaveBeenCalledWith({
        where: { filmId: mockFilmInvalidId, status: true },
      });
    });
  });

  describe('add film', () => {
    it('should create a new film object', async () => {
      jest.spyOn(filmRepository, 'save').mockResolvedValue(mockFilm);
      expect(filmRepository.findOne).toHaveBeenCalled();

      const newFilm = await filmService.create(mockFilmDTO);

      expect(filmRepository.save).toHaveBeenCalledTimes(1);
      expect(filmRepository.save).toHaveBeenCalledWith(mockFilmDTO);
      expect(newFilm).toEqual(mockFilm);
    });

    it(`should throw error: film's title has been exist`, async () => {
      jest.spyOn(filmRepository, 'findOne').mockResolvedValue(mockFilm);

      const result = async () => {
        return await filmService.create(mockFilmDTO);
      };
      expect(filmRepository.findOne).toHaveBeenCalled();
      expect(result()).rejects.toThrow(FILM_ERROR_MESSAGE.TITLE_EXIST);
    });
  });

  describe('update film', () => {
    it(`should not modify a film object because not found id`, async () => {
      jest.spyOn(filmRepository, 'findOne').mockResolvedValue(null);

      const result = async () => {
        return await filmService.update(mockFilmId, mockDataUpdate);
      };

      expect(result()).rejects.toThrow(FILM_ERROR_MESSAGE.NOT_FOUND_ID);
      expect(filmRepository.findOne).toHaveBeenCalled();
      expect(filmRepository.update).not.toHaveBeenCalled();
    });

    it(`should not modify a film object because film's title has been exist`, async () => {
      jest
        .spyOn(filmRepository, 'findOne')
        .mockResolvedValueOnce(mockFilm)
        .mockResolvedValueOnce(mockFilmUpdate);

      const result = async () => {
        return await filmService.update(mockFilmId, mockDataUpdate);
      };

      expect(filmRepository.findOne).toHaveBeenCalled();
      expect(result()).rejects.toThrow(FILM_ERROR_MESSAGE.TITLE_EXIST);
      expect(filmRepository.update).not.toHaveBeenCalled();
    });

    it(`should modify a film object`, async () => {
      jest
        .spyOn(filmRepository, 'findOne')
        .mockResolvedValueOnce(mockFilm)
        .mockResolvedValueOnce(null);
      jest
        .spyOn(filmRepository, 'update')
        .mockResolvedValue({ raw: mockFilm, affected: 1 } as UpdateResult);

      const film = await filmService.update(mockFilmId, mockDataUpdate);
      expect(film).toEqual({ ...mockFilm, ...mockDataUpdate });
    });
  });

  describe('delete film', () => {
    it(`should not delete a film object because not found id`, async () => {
      jest.spyOn(filmRepository, 'findOne').mockResolvedValue(null);

      const result = async () => {
        return await filmService.delete(mockFilmId);
      };

      expect(filmRepository.findOne).toHaveBeenCalled();
      expect(result()).rejects.toThrow(FILM_ERROR_MESSAGE.NOT_FOUND_ID);
      expect(filmRepository.softDelete).not.toHaveBeenCalled();
    });

    it('should soft delete a film object', async () => {
      jest.spyOn(filmRepository, 'findOne').mockResolvedValue(mockFilm);
      jest.spyOn(filmRepository, 'softDelete').mockResolvedValue({
        raw: mockFilmId,
        affected: 1,
      } as UpdateResult);

      const film = await filmService.delete(mockFilmId);

      expect(filmRepository.findOne).toHaveBeenCalled();
      expect(filmRepository.findOne).toHaveBeenCalledWith({
        where: { filmId: mockFilmId, status: true },
      });
      expect(filmRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(filmRepository.softDelete).toHaveBeenCalledWith(mockFilmId);
      expect(film).toEqual(mockFilm);
    });
  });
});
