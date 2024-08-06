import { Module } from '@nestjs/common';
import { DailysController } from './dailys.controller';
import { DailysService } from './providers/dailys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Daily } from './daily.entity';

@Module({
    controllers: [DailysController],
    providers:[DailysService],
    imports:[TypeOrmModule.forFeature([Daily])]
})
export class DailysModule {

}