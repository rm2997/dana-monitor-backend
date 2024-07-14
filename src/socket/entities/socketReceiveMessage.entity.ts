import { SocketMessageStatus } from './index';

export class SocketReceiveMessage {
  Status: SocketMessageStatus;
  Data: Map<string, string>;
  constructor(status: SocketMessageStatus, data: Map<string, string>) {
    this.Status = status;
    this.Data = { ...data };
  }
}
