import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
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

  @Get('/categories/:serverId')
  @ApiOperation({ summary: "Get serverId's log categories", tags: ['logger'] })
  getCategories(@Param('serverId') serverId: string): Response<string[]> {
    const categories = this.loggerService.getCategories(serverId);

    return this.responseService.createSuccessResponse(categories);
  }

  @Get('/logs/:serverId')
  @ApiOperation({ summary: "Get serverId's logs", tags: ['logger'] })
  getLogs(@Param('serverId') serverId: string): Response<LoggingEvent[]> {
    const logs = this.loggerService.getLogs(serverId);
    return this.responseService.createSuccessResponse(logs);
  }

  @Post('/upload')
  @ApiOperation({ summary: "Set serverId's logs", tags: ['logger'] })
  setLogs(@Body() setLogsDto: SetLogsDto): Response {
    this.loggerService.setLogs(setLogsDto);

    return this.responseService.createSuccessResponse();
  }
}
