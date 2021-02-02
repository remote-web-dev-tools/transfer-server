import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsOptional } from 'class-validator';
import { TransferData } from '../interfaces/transfer-data.interface';
import { ClientId, ServerId } from '../interfaces/transfer-id.interface';

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
