import { Injectable } from '@nestjs/common';

export interface Response<T = any> {
  code: number;
  message: string;
  error?: any;
  data?: T;
}

interface SimilarError {
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

  createErrorResponse(error: SimilarError, code = -1): Response {
    return {
      code,
      message: error.message,
      error,
    };
  }
}
