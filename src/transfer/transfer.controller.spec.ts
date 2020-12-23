import { Test, TestingModule } from '@nestjs/testing';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { ResponseService } from '../common/services/response.service';

describe('Transfer Controller', () => {
  let controller: TransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferController],
      providers: [TransferService, ResponseService],
    }).compile();

    controller = module.get<TransferController>(TransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
