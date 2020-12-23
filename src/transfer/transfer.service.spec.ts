import { Test, TestingModule } from '@nestjs/testing';
import { TransferService } from './transfer.service';

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

describe('TransferService', () => {
  let service: TransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransferService],
    }).compile();

    service = module.get<TransferService>(TransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('transferData should be a map', () => {
    expect(service.transferData).toBeInstanceOf(Map);
  });

  it('default EXPIRED time is 600', () => {
    expect(service.EXPIRED).toEqual(600);
  });

  it('EXPIRED should be more than 0', () => {
    service.EXPIRED = -200;

    expect(service.EXPIRED).toEqual(0);
  });

  it('should clear expired data', async () => {
    service.EXPIRED = 1;
    service.appendTransferData('s1', 'c1', [1, 2]);

    await sleep(100);
    service.removeExpiredLogs();
    expect(service.getTransferData('s1', 'c1')).toEqual([]);
  });

  describe('appendTransferData', () => {
    it('appender to not exist serverId', () => {
      service.appendTransferData('s1', 'c1', [1, 2]);

      expect(service.transferData.get('s1').get('c1').data).toEqual([1, 2]);
    });

    it('appender to not exist clientId', () => {
      service.appendTransferData('s1', 'c1', [1, 2]);
      service.appendTransferData('s1', 'c2', [3, 4]);

      expect(service.transferData.get('s1').get('c1').data).toEqual([1, 2]);
      expect(service.transferData.get('s1').get('c2').data).toEqual([3, 4]);
    });

    it('appender to exist serverId and clientId', () => {
      service.appendTransferData('s1', 'c1', [1, 2]);
      service.appendTransferData('s1', 'c1', [3, 4]);

      expect(service.transferData.get('s1').get('c1').data).toEqual([
        1,
        2,
        3,
        4,
      ]);
    });
  });

  describe('getClientIds', () => {
    it('should return []', () => {
      expect(service.getClientIds('s1')).toEqual([]);
    });

    it("should return serverId's clientIds", () => {
      service.appendTransferData('s1', 'c1', [1, 2]);
      service.appendTransferData('s1', 'c2', [1, 2]);

      expect(service.getClientIds('s1')).toEqual(['c1', 'c2']);
    });
  });

  describe('getTransferData', () => {
    it('should return [] by not exist serverId', () => {
      expect(service.getTransferData('s1', 'c1')).toEqual([]);
    });

    it('should return [] by not exist clientId', () => {
      service.appendTransferData('s1', 'c1', [1, 2]);

      expect(service.getTransferData('s1', 'c2')).toEqual([]);
    });

    it('should return data by serverId and clientId', () => {
      service.appendTransferData('s1', 'c1', [1, 2]);

      expect(service.getTransferData('s1', 'c1')).toEqual([1, 2]);
    });

    it('should clean data after get', () => {
      service.appendTransferData('s1', 'c1', [1, 2]);
      service.appendTransferData('s1', 'c2', [3, 4]);

      service.getTransferData('s1', 'c1');

      expect(service.getTransferData('s1', 'c1')).toEqual([]);
      expect(service.getTransferData('s1', 'c2')).toEqual([3, 4]);
    });
  });
});
