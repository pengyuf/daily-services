import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DailysService } from './providers/dailys.service';

@Controller('dailys')
export class DailysController {
     constructor(
          private readonly dailysService: DailysService
     ) { }

     @Get('list')
     public findAll() {
          return '获取全部'
          // return this.dailysService.findAll()
     }

     // @Get('detail')
     // public findOne(@Query() query: any) {
     //      console.log('query',query)
     //      return this.dailysService.findOne(query)
     // }

     // @Post('add')
     // public addOne(
     //      @Body() dailyDto: any,
     // ) {
     //      return this.dailysService.addOne(dailyDto)
     // }

     // @Put('update')
     // public updateOne(
     //      @Body() dailyDto: any
     // ) {
     //      return this.dailysService.updateOne(dailyDto)
     // }

     // @Delete('del')
     // public delOne(@Query() query: any) {
     //      return this.dailysService.delOne(query)
     // }
}
