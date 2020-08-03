import { IsArray, IsString } from 'class-validator';
import { LoggingEvent } from '../interfaces/logging-event.interface';

export class SetLogsDto {
  @IsString()
  readonly serverId: string;

  @IsArray()
  readonly logs: LoggingEvent[];
}
