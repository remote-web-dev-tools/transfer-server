import { Injectable } from '@nestjs/common';
import { ServerId } from '../interfaces/server-id.interface';
import { LoggingEvent } from '../interfaces/logging-event.interface';

interface LoggerItem {
  logs: LoggingEvent[];
  lastUpdateTime: number;
  expired: number;
}

@Injectable()
export class LoggerService {
  /**
   * logs expired time, default 600 second
   * @private
   */
  private _EXPIRED = 600;

  get EXPIRED(): number {
    return this._EXPIRED;
  }

  _loggerDatabase: Map<ServerId, LoggerItem> = new Map<ServerId, LoggerItem>();

  get loggerDatabase(): Map<ServerId, LoggerItem> {
    return this._loggerDatabase;
  }

  setExpired(value: number): void {
    this._EXPIRED = Math.max(0, value);
  }

  /**
   *get all loggingEvent's category name
   */
  getCategories(serverId: ServerId): string[] {
    const loggerItem = this.loggerDatabase.get(serverId);

    if (loggerItem) {
      const categoriesSet = new Set<string>();
      loggerItem.logs.forEach(item => categoriesSet.add(item.category));

      return Array.from(categoriesSet);
    }

    return [];
  }

  /**
   * get logs
   * @param serverId
   */
  getLogs(serverId: ServerId): LoggingEvent[] {
    const loggerItem = this.loggerDatabase.get(serverId);
    let logs = [];

    if (loggerItem) {
      logs = [].concat(loggerItem.logs);
      this.clearLogs(loggerItem);
    }

    return logs;
  }

  /**
   * set logs
   * @param serverId
   * @param logs
   */
  setLogs(serverId: ServerId, logs: LoggingEvent[]): void {
    let loggerItem = this.loggerDatabase.get(serverId);

    if (!loggerItem) {
      loggerItem = this.createLoggerItem();
    }

    loggerItem.logs = loggerItem.logs.concat(logs);

    this.updateLastModifyTime(loggerItem);
    this.loggerDatabase.set(serverId, loggerItem);
  }

  /**
   * remove expired logs
   */
  removeExpiredLogs(): void {
    this.loggerDatabase.forEach((value, key, map) => {
      if (Date.now() - value.lastUpdateTime > value.expired) {
        map.delete(key);
      }
    });
  }

  /**
   * clear loggerItem logs
   * @param loggerItem
   * @private
   */
  private clearLogs(loggerItem: LoggerItem): void {
    loggerItem.logs = [];
  }

  /**
   * update loggerItem last modify time
   * @param loggerItem
   * @private
   */
  private updateLastModifyTime(loggerItem: LoggerItem): void {
    loggerItem.lastUpdateTime = Date.now();
  }

  /**
   * create logger item
   * @private
   */
  private createLoggerItem(): LoggerItem {
    return {
      lastUpdateTime: -1,
      expired: this._EXPIRED,
      logs: [],
    };
  }
}
