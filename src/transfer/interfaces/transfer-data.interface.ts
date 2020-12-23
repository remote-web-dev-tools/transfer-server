import { ClientId, ServerId } from './transfer-id.interface';

export interface TransferData {
  serverId: ServerId;
  clientId?: ClientId;
  data: any[];
}
