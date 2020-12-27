import { ApiProperty } from '@nestjs/swagger';

import { TransferData } from '../interfaces/transfer-data.interface';
import { ClientId, ServerId } from '../interfaces/transfer-id.interface';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class TransferDto implements TransferData {
  @ApiProperty()
  @IsArray()
  data: any[];

  @ApiProperty()
  @IsString()
  serverId: ServerId;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  clientId?: ClientId;
}
