import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCategories', () => {
    it('should return [] with exits serverId', () => {
      expect(service.getCategories('1')).toEqual([]);
    });

    it('should distinct category name', () => {
      service.setLogs('1', [
        { category: 'category1' },
        { category: 'category1' },
        { category: 'category2' },
      ]);
      expect(service.getCategories('1')).toEqual(['category1', 'category2']);

      service.setLogs('2', []);
      expect(service.getCategories('2')).toEqual([]);

      service.setLogs('3', [
        { category: 'category1' },
        { category: 'category2' },
      ]);

      expect(service.getCategories('3')).toEqual(['category1', 'category2']);
    });
  });

  describe('setLogs', () => {
    it('should correctly set log with first ', () => {
      service.setLogs('1', [{ category: 'category' }]);

      expect(service.loggerDatabase.get('1').expired).toEqual(600);
      expect(service.loggerDatabase.get('1').logs).toEqual([
        { category: 'category' },
      ]);
      expect(
        service.loggerDatabase.get('1').lastUpdateTime - Date.now(),
      ).toBeLessThanOrEqual(1000);
    });

    it('should correctly set log', () => {
      service.setLogs('1', [{ category: 'category', index: 1 }]);
      service.setLogs('1', [{ category: 'category', index: 2 }]);

      expect(service.loggerDatabase.get('1').logs).toEqual([
        { category: 'category', index: 1 },
        { category: 'category', index: 2 },
      ]);
      expect(
        service.loggerDatabase.get('1').lastUpdateTime - Date.now(),
      ).toBeLessThanOrEqual(1000);
    });
  });

  describe('getLogs', () => {
    it('should return [] with exits serverId', () => {
      expect(service.getLogs('1')).toEqual([]);
    });

    it("should return serverId's logs", () => {
      service.setLogs('1', [{ category: 'category', index: 1 }]);
      service.setLogs('1', [{ category: 'category', index: 2 }]);

      expect(service.getLogs('1')).toEqual([
        { category: 'category', index: 1 },
        { category: 'category', index: 2 },
      ]);
    });

    it('should clear logs after get logs', () => {
      service.setLogs('1', [{ category: 'category', index: 1 }]);
      service.setLogs('1', [{ category: 'category', index: 2 }]);

      service.getLogs('1');

      expect(service.loggerDatabase.get('1').logs).toEqual([]);
    });
  });

  describe('setExpired', () => {
    it('should EXPIRED default is 600', () => {
      expect(service.EXPIRED).toEqual(600);
    });

    it('should EXPIRED grater than 0', () => {
      service.setExpired(-1);
      expect(service.EXPIRED).toEqual(0);

      service.setExpired(200);
      expect(service.EXPIRED).toEqual(200);
    });
  });

  it('should remove expired logs', done => {
    service.setExpired(100);
    service.setLogs('1', [{ category: 'category', index: 1 }]);
    service.setLogs('1', [{ category: 'category', index: 2 }]);

    setTimeout(() => {
      service.removeExpiredLogs();
      expect(service.loggerDatabase.get('1')).toEqual(undefined);
      done();
    }, 1000);
  });
});
