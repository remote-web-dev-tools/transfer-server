import { Injectable } from '@nestjs/common';

export interface Response<T = any> {
  code: number;
  message: string;
  serverId?: string;
  error?: any;
  data?: T;
}

interface SimilarError {
  message: string;
}

@Injectable()
export class ResponseService {
  createSuccessResponse<T>(serverId?: string, result?: T): Response<T> {
    return {
      code: 200,
      message: 'success',
      data: result,
      serverId,
    };
  }

  createErrorResponse(
    error: SimilarError,
    code = -1,
    serverId?: string,
  ): Response {
    return {
      code,
      message: error.message,
      error,
      serverId,
    };
  }
}
