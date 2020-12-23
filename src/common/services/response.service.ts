import { Injectable } from '@nestjs/common';

export interface Response<T = any> {
  code: number;
  message: string;
  error?: any;
  data?: T;
}

interface MockError {
  message: string;
}

@Injectable()
export class ResponseService {
  createSuccessResponse<T>(result?: T): Response<T> {
    return {
      code: 200,
      message: 'success',
      data: result,
    };
  }

  createErrorResponse(error: MockError, code = -1): Response {
    return {
      code,
      error,
      message: error.message,
    };
  }
}
