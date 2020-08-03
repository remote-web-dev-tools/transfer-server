import { IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoggingEventDto } from './logging-event.dto';

export class SetLogsDto {
  @IsString()
  @ApiProperty({ example: '1' })
  readonly serverId: string;

  @ValidateNested()
  @ApiProperty({ type: LoggingEventDto, isArray: true })
  readonly logs: LoggingEventDto[];
}
