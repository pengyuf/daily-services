import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailysModule } from './dailys/dailys.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Daily } from './dailys/daily.entity';

@Module({
  imports: [
    DailysModule,
    TypeOrmModule.forRoot({
      entities: [Daily],
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'daily-services',
      synchronize: true, // 注意：在生产环境中不建议使用，可能会导致数据丢失
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
