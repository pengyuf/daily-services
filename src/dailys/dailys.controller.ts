import { Controller, Get } from '@nestjs/common';

@Controller('dailys')
export class DailysController {
    @Get()
    public getDailys() {
        return `获取日记`
    }
}
