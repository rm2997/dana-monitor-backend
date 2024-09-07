import { Inject, Injectable, Logger } from '@nestjs/common';
import * as net from 'net';
import { SocketConfig, SocketReceiveMessage } from './entities';
import { parse } from 'path';

@Injectable()
export class SocketService {
  private clientSocket: net.Socket;
  private serverAddress = {
    port: 0,
    host: '',
  };
  private timer: any;
  private attemps = 1;
  private timerFlag = false;
  public maxAttemps = 10;
  public rcvQueue = [];

  constructor(@Inject('SOCKET_CONFIG_OPTIONS') private options: SocketConfig) {
    this.serverAddress = { host: options.host, port: options.port };
    this.maxAttemps =
      options.maxAttemps == 0 || options.maxAttemps == null
        ? 10
        : options.maxAttemps;
    this.clientSocket = this.createSocket();
    if (!this.clientSocket) {
      Logger.error('Client socket is not initiated...', 'Socket');
      return;
    } else {
      Logger.log(
        `Socket is initiated for server ${this.serverAddress.host}:${this.serverAddress.port} , total allowed attempt :${this.maxAttemps}`,
        'Socket',
      );
    }
    this.connectToServer();
  }

  createSocket(): net.Socket {
    const socket = new net.Socket();
    if (this.serverAddress.port == 0) return;

    socket.on('data', (data) => {
      this.handleReceivedData(data);
    });

    socket.on('close', () => {
      this.handleClosedConnection();
    });

    socket.on('error', (error) => {
      this.handleError(error);
    });
    return socket;
  }

  destroySocket(): void {
    this.clientSocket.resetAndDestroy();
  }

  connectToServer(): boolean {
    if (this.clientSocket.connecting) {
      return;
    }
    if (this.attemps > this.maxAttemps && this.timerFlag == true) {
      Logger.warn('Maximum attempts to reconnect server exceeded...', 'Socket');
      this.attemps = 1;
      this.clearTimer();
      return;
    }
    this.clientSocket.connect(this.serverAddress, () => {
      Logger.log(
        `Successfully connected to server [ local: ${this.clientSocket.localAddress} , remote: ${this.clientSocket.remoteAddress} ]`,
        'Socket',
      );

      if (this.timer) {
        clearInterval(this.timer);
        this.attemps = 1;
        this.timerFlag = false;
      }
    });
    if (this.clientSocket.closed) return false;
    else return true;
  }

  parseMessage(message: string): string {
    const messageLen = Number.parseInt(message.trim().substring(0, 10));
    if (!messageLen) {
      Logger.error(
        `Parser error: Invalid message format, missing length, ${messageLen}`,
        'Socket',
      );
      return '';
    }
    if (messageLen == message.substring(10).length) {
      return message.substring(10);
    } else {
      Logger.error(
        `Parser error: Unexpected message length, expected: ${messageLen}, but: ${message.length - 10}`,
        'Socket',
      );
      return '';
    }
  }

  handleReceivedData(data: any): void {
    try {
      Logger.log(`Data received : [${data.toString().trim()}]`, 'Socket');
      const parsed = this.parseMessage(data.toString().trim());
      Logger.log(`Message parsig done.., ${parsed}`, 'Socket');
      if (parsed) {
        const message = JSON.parse(parsed) as SocketReceiveMessage;
        if (!message) {
          Logger.error('Cant parse given JSON message', 'Socket');
          return;
        }
        this.rcvQueue.push(parsed);
      }
    } catch (error) {
      Logger.error('JSON Parser error: ' + error.toString(), 'Socket');
    }
  }

  sendData(data: any): void {
    if (this.clientSocket.closed) {
      this.reconnect();
    }
    let sendingMessage: string = JSON.stringify(data);
    sendingMessage =
      sendingMessage.length.toString().padStart(4, '0') + sendingMessage;
    this.clientSocket.write(sendingMessage);
  }

  handleError(error: any): void {
    Logger.error(`Something went wrong: ${error.toString()}`, 'Socket');
  }

  handleClosedConnection(): void {
    if (!this.clientSocket.closed) {
      return;
    }
    Logger.warn('Connection closed..', 'Socket');
    this.destroySocket();
    this.clientSocket = this.createSocket();
    if (this.timerFlag == false) this.reconnect();
  }

  reconnect(): void {
    if (this.timerFlag || this.attemps > this.maxAttemps) {
      return;
    }
    this.timer = setInterval(() => {
      Logger.warn(
        `retrying to connect [${this.serverAddress.host}:${this.serverAddress.port}]...${this.attemps++}`,
        'Socket',
      );
      this.timerFlag = true;
      this.connectToServer();
    }, 3000);
  }

  clearTimer(): void {
    clearInterval(this.timer);
    this.timerFlag = false;
  }
}
