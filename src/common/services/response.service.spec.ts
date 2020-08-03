import { Test, TestingModule } from '@nestjs/testing';
import { ResponseService } from './response.service';

describe('ResponseService', () => {
  let service: ResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseService],
    }).compile();

    service = module.get<ResponseService>(ResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create success response', () => {
    expect(service.createSuccessResponse()).toEqual({
      code: 200,
      message: 'success',
    });

    expect(service.createSuccessResponse(1)).toEqual({
      code: 200,
      message: 'success',
      data: 1,
    });

    expect(service.createSuccessResponse({ a: 1 })).toEqual({
      code: 200,
      message: 'success',
      data: {
        a: 1,
      },
    });
  });

  it('should create error response', () => {
    const error = {
      message: 'error',
    };

    expect(service.createErrorResponse(error, 500)).toEqual({
      code: 500,
      message: 'error',
      error,
    });

    expect(service.createErrorResponse(error)).toEqual({
      code: -1,
      message: 'error',
      error,
    });
  });
});
