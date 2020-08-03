import { Test, TestingModule } from '@nestjs/testing';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';
import { ResponseService } from '../common/services/response.service';
import { LoggingEvent } from './interfaces/logging-event.interface';
import { SetLogsDto } from './dto/set-logs.dto';

describe('Logger Controller', () => {
  let controller: LoggerController;
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoggerController],
      providers: [LoggerService, ResponseService],
    }).compile();

    controller = module.get<LoggerController>(LoggerController);
    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should return serverId's category names", async () => {
    jest
      .spyOn(loggerService, 'getCategories')
      .mockImplementation((serverId: string) => {
        if (serverId === '1') return ['page', 'network'];
        return [];
      });

    expect((await controller.getCategories('1')).data).toEqual([
      'page',
      'network',
    ]);
    expect((await controller.getCategories('2')).data).toEqual([]);
  });

  it("should return serverId's logs", async () => {
    const log1: LoggingEvent[] = [
      { category: 'page' },
      { category: 'network' },
    ];

    jest
      .spyOn(loggerService, 'getLogs')
      .mockImplementation((serverId: string) => {
        if (serverId === '1') return log1;
        return [];
      });

    expect((await controller.getLogs('1')).data).toEqual(log1);
    expect((await controller.getLogs('2')).data).toEqual([]);
  });

  it('should set logs', async () => {
    const setLogsDto: SetLogsDto = {
      serverId: '1',
      logs: [{ category: 'page' }, { category: 'network' }],
    };

    jest.spyOn(loggerService, 'setLogs').mockImplementation(_setLogsDto => {
      expect(_setLogsDto).toEqual(setLogsDto);
    });

    expect((await controller.setLogs(setLogsDto)).data).toEqual(undefined);
  });
});
