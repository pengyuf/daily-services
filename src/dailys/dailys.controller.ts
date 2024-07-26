import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('dailys')
export class DailysController {
    @Get()
    public getDailys() {
        return `获取日记`
    }

    @Get('details')
    public getDailyById(@Param('id') id:number){
         return `获取日记详情`
    }

    @Post()
    public addDaily(@Body() addDailyDto:any){
         return `增加日记`
    }

    @Delete()
    public delDaily(@Param('id') id:number){
         return `删除日记`
    }
}
