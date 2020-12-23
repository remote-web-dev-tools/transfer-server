import { ServerId, ClientId } from './transfer-id.interface';

export interface TransferData {
  serverId: ServerId;
  clientId?: ClientId;
  data: any[];
}
