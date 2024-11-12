import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SqlserverService } from './sqlserver/sqlserver.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RedisServerService } from './redis-server/redis-server.service';

@UseGuards(JwtAuthGuard)
@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sqlServerService: SqlserverService,
    private readonly redisService: RedisServerService,
  ) {}

  @Post('connect')
  connect() {
    this.appService.connect();
  }

  @Post('CloseGate')
  async closeGate() {
    const retVal = await this.appService.closeGate();
    const filter = retVal.filter((element) => element == null);
    if (filter.length == retVal.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    return retVal;
  }

  @Post('OpenGate')
  async openGate() {
    const retVal = await this.appService.openGate();
    const filter = retVal.filter((element) => element == null);
    if (filter.length == retVal.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    return retVal;
  }

  @Post('ReconnectLu')
  async reconnectLu() {
    const retVal = await this.appService.reconnectLu();
    const filter = retVal.filter((element) => element == null);
    if (filter.length == retVal.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    return retVal;
  }

  @Post('BackupDb')
  async backupDb() {
    const retVal = await this.appService.backupDb();
    const filter = retVal.filter((element) => element == null);
    if (filter.length == retVal.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    return retVal;
  }

  @Post('BackupLogFile')
  async backupLogFile() {
    const retVal = await this.appService.backupLogFile();
    const filter = retVal.filter((element) => element == null);
    if (filter.length == retVal.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    return retVal;
  }

  @Post('RotateTable')
  async rotateTable() {
    const retVal = await this.appService.rotateTable();
    const filter = retVal.filter((element) => element == null);
    if (filter.length == retVal.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    return retVal;
  }

  @Post('AddLuPack')
  async addLuPack() {
    const retVal = await this.appService.addLuPack();
    const filter = retVal.filter((element) => element == null);
    if (filter.length == retVal.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    return retVal;
  }

  @Get('GetResponseTimes')
  async getResponseTimes(): Promise<string[]> {
    Logger.log('New database message received...', 'GetResponseTimes');
    const redisResult: string[] =
      await this.redisService.getDataFromRedis('ResponseTimes');
    if (redisResult !== null) return redisResult;

    const result = await this.sqlServerService.getAllResponsTimes();
    if (!result) {
      throw new NotFoundException("Couldn't get data from DB...");
    }
    const resultJson = {
      Status: { Code: '0', Message: 'Ok' },
      Data: JSON.stringify(result),
    };
    const apiResult = [JSON.stringify(resultJson)];
    await this.redisService.putDataToRedis('ResponseTimes', apiResult);
    return apiResult;
  }

  @Get('GetHostTransactions')
  async getHostTransactions(): Promise<string[]> {
    Logger.log('New database message received...', 'GetHostTransactions');
    const redisResult: string[] =
      await this.redisService.getDataFromRedis('HostTransactions');
    if (redisResult !== null) return redisResult;

    const result = await this.sqlServerService.getHostTransactions();
    if (!result) {
      throw new NotFoundException("Couldn't get data from DB...");
    }
    const resultJson = {
      Status: { Code: '0', Message: 'Ok' },
      Data: JSON.stringify(result),
    };
    const apiResult = [JSON.stringify(resultJson)];
    await this.redisService.putDataToRedis('HostTransactions', apiResult);
    return apiResult;
  }

  @Get('GetDanaStatus')
  async getDanaInformation(): Promise<string[]> {
    const redisResult: string[] =
      await this.redisService.getDataFromRedis('DanaInformation');
    if (redisResult !== null) return redisResult;

    const apiResult = await this.appService.getDanaInformation();
    const filter = apiResult.filter((element) => element == null);
    if (filter.length == apiResult.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    await this.redisService.putDataToRedis('DanaInformation', apiResult);
    return apiResult;
  }

  @Get('GetLuStatus')
  async getLuInformation(): Promise<string[]> {
    const redisResult: string[] =
      await this.redisService.getDataFromRedis('LuInformation');

    const apiResult = await this.appService.getLuInformation();
    if (redisResult !== null) return redisResult;

    const filter = apiResult.filter((element) => element == null);
    if (filter.length == apiResult.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    await this.redisService.putDataToRedis('LuInformation', apiResult);
    return apiResult;
  }

  @Get('GetGateStatus')
  async getGateInformation(): Promise<string[]> {
    const redisResult: string[] =
      await this.redisService.getDataFromRedis('GateInformation');
    if (redisResult !== null) return redisResult;

    const apiResult = await this.appService.getGateInformation();
    const filter = apiResult.filter((element) => element == null);
    if (filter.length == apiResult.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    await this.redisService.putDataToRedis('GateInformation', apiResult);
    return apiResult;
  }

  @Get('GetPingStatus')
  async getPingInformation(): Promise<string[]> {
    const redisResult: string[] =
      await this.redisService.getDataFromRedis('PingInformation');
    if (redisResult !== null) return redisResult;

    const apiResult = await this.appService.getPingInformation();
    const filter = apiResult.filter((element) => element == null);
    if (filter.length == apiResult.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    await this.redisService.putDataToRedis('PingInformation', apiResult);
    return apiResult;
  }

  @Get('GetPortStatus')
  async getPortInformation(): Promise<string[]> {
    const redisResult: string[] =
      await this.redisService.getDataFromRedis('PortInformation');
    if (redisResult !== null) return redisResult;

    const apiResult = await this.appService.getPortInformation();
    const filter = apiResult.filter((element) => element == null);
    if (filter.length == apiResult.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    await this.redisService.putDataToRedis('PortInformation', apiResult);
    return apiResult;
  }
}
