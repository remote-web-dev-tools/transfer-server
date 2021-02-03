import { Test, TestingModule } from '@nestjs/testing';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { ResponseService } from '../common/services/response.service';

describe('Transfer Controller', () => {
  let controller: TransferController;
  let transferService: TransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferController],
      providers: [TransferService, ResponseService],
    }).compile();

    controller = module.get<TransferController>(TransferController);
    transferService = module.get<TransferService>(TransferService);
  });

  describe('getClientIds', () => {
    it("should return serverId's clientIds", () => {
      const data = ['c1', 'c2', 'c3'];
      jest
        .spyOn(transferService, 'getClientIds')
        .mockImplementation((serverId) => {
          expect(serverId).toEqual('s1');
          return data;
        });

      expect(controller.getClientIds('s1').data).toEqual({
        clientIds: data,
        serverId: 's1',
      });
    });
  });

  describe('getTransferData', () => {
    it('should return transfer data', () => {
      const data = [1, 2];
      const mockServerId = 's1';
      const mockClientId = 'c1';

      jest
        .spyOn(transferService, 'getTransferData')
        .mockImplementation((serverId, clientId) => {
          expect(serverId).toEqual(mockServerId);
          expect(clientId).toEqual(mockClientId);
          return data;
        });

      expect(
        controller.getTransferData(mockServerId, mockClientId).data,
      ).toEqual({ data, serverId: mockServerId, clientId: mockClientId });
    });
  });

  describe('uploadTransferData', () => {
    it('should save uploaded data', () => {
      const mockServerId = 's1';
      const mockData = [1, 2];

      const mockBody = { serverId: mockServerId, data: mockData };

      jest
        .spyOn(transferService, 'appendTransferData')
        .mockImplementation((serverId, clientId, data) => {
          expect(serverId).toEqual(mockServerId);
          expect(clientId).toEqual('127.0.0.1');
          expect(data).toEqual(mockData);
          return data;
        });

      expect(
        controller.uploadTransferData(mockBody, '127.0.0.1').message,
      ).toEqual('success');
    });

    it('should save uploaded data to special clientId', function () {
      const mockServerId = 's1';
      const mockClientId = 'c1';
      const mockData = [1, 2];

      const mockBody = {
        serverId: mockServerId,
        data: mockData,
        clientId: mockClientId,
      };

      jest
        .spyOn(transferService, 'appendTransferData')
        .mockImplementation((serverId, clientId, data) => {
          expect(serverId).toEqual(mockServerId);
          expect(clientId).toEqual(mockClientId);
          expect(data).toEqual(mockData);
          return data;
        });

      expect(
        controller.uploadTransferData(mockBody, '127.0.0.1').message,
      ).toEqual('success');
    });
  });
});
