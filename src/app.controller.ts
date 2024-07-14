import { Controller, Get, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('GetDanaStatus')
  async getDanaInformation(): Promise<string[]> {
    const retVal = await this.appService.getDanaInformation();
    const filter = retVal.filter((element) => element == null);
    if (filter.length == retVal.length) {
      throw new NotFoundException(`Coulden't get data from Dana server`);
    }
    return retVal;
  }

  @Get('connect')
  connect() {
    this.appService.connect();
  }
}
