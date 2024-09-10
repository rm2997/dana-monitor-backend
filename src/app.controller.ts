import { Controller, Get, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('connect')
  connect() {
    this.appService.connect();
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
