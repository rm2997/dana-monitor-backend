import { Injectable, Logger } from '@nestjs/common';
import { SocketService } from './socket/socket.service';
import { SocketSendMessage } from './socket/entities';

@Injectable()
export class AppService {
  constructor(private readonly socketService: SocketService) {}

  async getDanaInformation(): Promise<any> {
    const retVal = [];
    let message = new SocketSendMessage('DANA_GetStatus', null, false);
    this.socketService.sendData(message);
    retVal.push(await this.getDataFromQueue());

    if (!retVal) return null;
    return retVal;
  }

  async getLuInformation(): Promise<any> {
    let message = new SocketSendMessage('MainFrame_GetLUStatus', null, false);
    this.socketService.sendData(message);
    const retVal = [];
    retVal.push(await this.getDataFromQueue());
    if (!retVal) return null;
    return retVal;
  }

  async getGateInformation(): Promise<any> {
    let message = new SocketSendMessage('MainFrame_GetGateStatus', null, false);
    this.socketService.sendData(message);
    const retVal = [];
    retVal.push(await this.getDataFromQueue());
    if (!retVal) return null;
    return retVal;
  }

  async getPingInformation(): Promise<any> {
    let message = new SocketSendMessage('MainFrame_CheckPing', null, false);
    this.socketService.sendData(message);
    const retVal = [];
    retVal.push(await this.getDataFromQueue());
    if (!retVal) return null;
    return retVal;
  }

  async getPortInformation(): Promise<any> {
    let message = new SocketSendMessage('MainFrame_CheckPort', null, false);
    this.socketService.sendData(message);
    const retVal = [];
    retVal.push(await this.getDataFromQueue());
    if (!retVal) return null;
    return retVal;
  }

  async getDataFromQueue(): Promise<string> {
    let retVal: string;
    let counter = 0;
    while (counter < 2) {
      counter++;
      await new Promise((r) => setTimeout(r, 1000));
      if (this.socketService.rcvQueue.length == 0) continue;
      retVal = this.socketService.rcvQueue.pop();
      Logger.log('Data received from queue:' + retVal, 'DANA-API');
      break;
    }
    return retVal;
  }

  connect() {
    this.socketService.reconnect();
  }
}
