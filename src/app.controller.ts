import { Controller, Get, Logger, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { SqlserverService } from './sqlserver/sqlserver.service';
import { ResponseTimes } from './sqlserver/entities/responseTimes.entity';
import { json } from 'stream/consumers';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sqlServerService: SqlserverService,
  ) {}

  @Get('connect')
  connect() {
    this.appService.connect();
  }

  @Get('GetResponseTimes')
  async getResponseTimes(): Promise<string[]> {
    Logger.log('New database message received...', 'GetResponseTimes');
    const result = await this.sqlServerService.getAllResponsTimes();
    if (!result) {
      throw new NotFoundException("Couldn't get data from DB...");
    }

    const resultJson = {
      Status: { Code: '0', Message: 'Ok' },
      Data: JSON.stringify(result),
    };
    Logger.log(`Response is ${JSON.stringify(result)}`, 'GetResponseTimes');
    return [JSON.stringify(resultJson)];
  }

  @Get('GetHostTransactions')
  async getHostTransactions(): Promise<string[]> {
    Logger.log('New database message received...', 'GetHostTransactions');
    const result = await this.sqlServerService.getHostTransactions();
    if (!result) {
      throw new NotFoundException("Couldn't get data from DB...");
    }

    const resultJson = {
      Status: { Code: '0', Message: 'Ok' },
      Data: JSON.stringify(result),
    };
    Logger.log(`Response is ${JSON.stringify(result)}`, 'GetHostTransactions');
    return [JSON.stringify(resultJson)];
  }

  @Get('GetDanaStatus')
  async getDanaInformation(): Promise<string[]> {
    const retVal = await this.appService.getDanaInformation();
    const filter = retVal.filter((element) => element == null);
    if (filter.length == retVal.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    return retVal;
  }

  @Get('GetLuStatus')
  async getLuInformation(): Promise<string[]> {
    const retVal = await this.appService.getLuInformation();
    const filter = retVal.filter((element) => element == null);
    if (filter.length == retVal.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    return retVal;
  }

  @Get('GetGateStatus')
  async getGateInformation(): Promise<string[]> {
    const retVal = await this.appService.getGateInformation();
    const filter = retVal.filter((element) => element == null);
    if (filter.length == retVal.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    return retVal;
  }

  @Get('GetPingStatus')
  async getPingInformation(): Promise<string[]> {
    const retVal = await this.appService.getPingInformation();
    const filter = retVal.filter((element) => element == null);
    if (filter.length == retVal.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    return retVal;
  }

  @Get('GetPortStatus')
  async getPortInformation(): Promise<string[]> {
    const retVal = await this.appService.getPortInformation();
    const filter = retVal.filter((element) => element == null);
    if (filter.length == retVal.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    return retVal;
  }
}
