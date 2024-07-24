import { Module } from '@nestjs/common';
import { DailysController } from './dailys.controller';

@Module({
    controllers: [DailysController]
})
export class DailysModule {

}