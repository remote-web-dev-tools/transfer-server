import { ApiProperty } from '@nestjs/swagger';

import { TransferData } from '../interfaces/transfer-data.interface';
import { ClientId, ServerId } from '../interfaces/transfer-id.interface';

export class TransferDto implements TransferData {
  @ApiProperty()
  data: any[];

  @ApiProperty()
  serverId: ServerId;

  @ApiProperty({ required: false })
  clientId?: ClientId;
}
