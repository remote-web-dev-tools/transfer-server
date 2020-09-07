import { Body, Controller, Get, Inject, Ip, Post } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggingEvent } from './interfaces/logging-event.interface';
import { Response, ResponseService } from '../common/services/response.service';
import { SetLogsDto } from './dto/set-logs.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('/api/logger')
export class LoggerController {
  @Inject()
  loggerService: LoggerService;

  @Inject()
  responseService: ResponseService;

  @Get('/categories')
  @ApiOperation({ summary: "Get serverId's log categories", tags: ['logger'] })
  getCategories(@Ip() ip: string): Response<string[]> {
    const serverId = this.getIpV4(ip);

    const categories = this.loggerService.getCategories(serverId);
    return this.responseService.createSuccessResponse(serverId, categories);
  }

  @Get('/logs')
  @ApiOperation({ summary: "Get serverId's logs", tags: ['logger'] })
  getLogs(@Ip() ip: string): Response<LoggingEvent[]> {
    const serverId = this.getIpV4(ip);

    const logs = this.loggerService.getLogs(serverId);
    return this.responseService.createSuccessResponse(serverId, logs);
  }

  @Post('/upload')
  @ApiOperation({ summary: "Set serverId's logs", tags: ['logger'] })
  setLogs(@Body() setLogsDto: SetLogsDto): Response {
    this.loggerService.setLogs(setLogsDto);

    return this.responseService.createSuccessResponse();
  }

  private getIpV4(ip: string) {
    const result = ip.split(':');

    return result[result.length - 1];
  }
}
