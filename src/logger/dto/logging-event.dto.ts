import { IsString } from 'class-validator';
import { LoggingEvent } from '../interfaces/logging-event.interface';
import { ApiProperty } from '@nestjs/swagger';

export class LoggingEventDto implements LoggingEvent {
  @IsString()
  @ApiProperty({ example: 'page' })
  readonly category: string;

  [key: string]: any;
}
