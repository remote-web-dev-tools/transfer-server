import { Injectable } from '@nestjs/common';
import { ClientId, ServerId } from './interfaces/transfer-id.interface';
import { Interval } from '@nestjs/schedule';

interface TransferItem {
  data: any[];
  lastUpdateTime: number;
  expired: number;
}

type Transfer = Map<ServerId, Map<ClientId, TransferItem>>;

@Injectable()
export class TransferService {
  private _transferData: Transfer = new Map();

  get transferData(): Transfer {
    return this._transferData;
  }

  /**
   * logs expired time, default 600 second
   * @private
   */
  private _EXPIRED = 600;

  get EXPIRED(): number {
    return this._EXPIRED;
  }

  set EXPIRED(val: number) {
    this._EXPIRED = Math.max(0, val);
  }

  private static clearTransferData(transferItem: TransferItem): void {
    transferItem.data = [];
  }

  private static updateLastModifyTime(loggerItem: TransferItem): void {
    loggerItem.lastUpdateTime = Date.now();
  }

  getClientIds(serverId: ServerId): ClientId[] {
    const clientMap = this.transferData.get(serverId);

    if (clientMap) {
      const clientIds: ClientId[] = [];

      clientMap.forEach((value, key) => {
        clientIds.push(key);
      });

      return clientIds;
    }

    return [];
  }

  getTransferData(serverId: ServerId, clientId: ClientId): any[] {
    const clientMap = this.transferData.get(serverId);

    if (clientMap) {
      const transferItem = clientMap.get(clientId);

      if (transferItem) {
        const data = [...transferItem.data];

        TransferService.clearTransferData(transferItem);
        return data;
      }
    }

    return [];
  }

  appendTransferData(
    serverId: ServerId,
    clientId: ClientId,
    data: any[],
  ): void {
    let clientMap = this.transferData.get(serverId);
    let transferItem: TransferItem;

    if (!clientMap) {
      clientMap = new Map<ClientId, TransferItem>();

      transferItem = this.createTransferItem();
      clientMap.set(clientId, transferItem);
      this.transferData.set(serverId, clientMap);
    } else {
      transferItem = clientMap.get(clientId);

      if (!transferItem) {
        transferItem = this.createTransferItem();
        clientMap.set(clientId, transferItem);
      }
    }

    transferItem.data = transferItem.data.concat(data);
    TransferService.updateLastModifyTime(transferItem);
  }

  @Interval(10 * 60 * 1000)
  removeExpiredLogs(): void {
    this.transferData.forEach(clientMap => {
      clientMap.forEach((value, key, map) => {
        if (Date.now() - value.lastUpdateTime > value.expired) {
          map.delete(key);
        }
      });
    });
  }

  private createTransferItem(): TransferItem {
    return {
      lastUpdateTime: -1,
      expired: this._EXPIRED,
      data: [],
    };
  }
}
